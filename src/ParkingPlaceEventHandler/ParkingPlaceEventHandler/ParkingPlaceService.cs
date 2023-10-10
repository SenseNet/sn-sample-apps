using Microsoft.AspNetCore.Mvc;
using SenseNet.Client;
using SenseNet.Client.WebApi;

namespace ParkingPlaceEventHandler;

public class ParkingPlaceService
{
    private readonly IUserRepositoryCollection _repositories;
    private ILogger<ParkingPlaceService> _logger;

    public ParkingPlaceService(IUserRepositoryCollection repositories, ILogger<ParkingPlaceService> logger)
    {
        _logger = logger;
        _repositories = repositories;
    }

    public async Task HandlePostAsync(ParkingPlaceChanged value, HttpContext httpContext)
    {
        if (!(value.EventName?.Equals("CREATE", StringComparison.OrdinalIgnoreCase) ?? false))
            return;

        var cancel = httpContext.RequestAborted;

        var repository = await _repositories.GetAdminRepositoryAsync(cancel);

        ParkingPlaceBooking? currentBooking = null;
        try
        {
            currentBooking = await repository.LoadContentAsync<ParkingPlaceBooking>(value.Path, cancel);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        var startDate = currentBooking.ParkingPlaceBookingStart.Date;

        var bookings = await GetCountOfBookingsAsync(startDate, repository, cancel);
        var parkingPlaces = await GetCountOfParkingPlacesAsync(repository, cancel);
        _logger.LogInformation("Booking count for {date}, {counts}", startDate, $"{bookings}/{parkingPlaces}");

        if (bookings < parkingPlaces)
            return;

        SendMail(parkingPlaces);
    }

    private async Task<int> GetCountOfParkingPlacesAsync(IRepository repository, CancellationToken cancel)
    {
        //return 5;
        return await repository.QueryCountAsync(new QueryContentRequest
        {
            Path = "/Root/Content/sample/parkingplace/parkingplaces",
            ContentQuery = "TypeIs:ParkingPlace",
        }, cancel);
    }
    private async Task<int> GetCountOfBookingsAsync(DateTime date, IRepository repository, CancellationToken cancel)
    {
        return await repository.QueryCountAsync(new QueryContentRequest
        {
            Path = "/Root/Content/sample/parkingplace/bookings",
            ContentQuery = $"+TypeIs:ParkingPlaceBooking " +
                           $"+ParkingPlaceBookingStart:>='{date:yyyy-MM-dd}' " +
                           $"+ParkingPlaceBookingStart:<'{date.AddDays(1):yyyy-MM-dd}'",
        }, cancel);
    }


    private void SendMail(int contentCount)
    {
        _logger.LogInformation("Sending mail to Parking Place Administrator about overloading (not implemented).");
    }
}
