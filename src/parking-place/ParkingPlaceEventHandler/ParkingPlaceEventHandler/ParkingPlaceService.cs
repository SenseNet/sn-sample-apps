using SenseNet.Client;
using SenseNet.Client.WebApi;

namespace ParkingPlaceEventHandler;

public class ParkingPlaceService
{
    private readonly IUserRepositoryCollection _repositories;
    private readonly ILogger<ParkingPlaceService> _logger;

    public ParkingPlaceService(IUserRepositoryCollection repositories, ILogger<ParkingPlaceService> logger)
    {
        _logger = logger;
        _repositories = repositories;
    }

    public async Task HandlePostAsync(ParkingPlaceChanged value, HttpContext httpContext)
    {
        // currently we handle only create events
        if (!(value.EventName?.Equals("CREATE", StringComparison.OrdinalIgnoreCase) ?? false))
            return;

        _logger.LogTrace("Parking place booking event {EventName} arrived for content {path}", 
            value.EventName, value.Path);

        var cancel = httpContext.RequestAborted;

        var repository = await _repositories.GetAdminRepositoryAsync(cancel);

        ParkingPlaceBooking? currentBooking;
        try
        {
            currentBooking = await repository.LoadContentAsync<ParkingPlaceBooking>(value.Path, cancel);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during loading parking place booking {path} from the repository.", value.Path);

            // we throw an exception here so that the caller (the repository) knows about the error
            throw;
        }

        var startDate = currentBooking.ParkingPlaceBookingStart.Date;

        var bookings = await GetCountOfBookingsAsync(startDate, repository, cancel);
        var parkingPlaces = await GetCountOfParkingPlacesAsync(repository, cancel);

        _logger.LogInformation("Booking count for {date}, {counts}", 
            startDate.ToString("yyyy-MM-dd"), $"{bookings}/{parkingPlaces}");

        if (bookings < parkingPlaces)
            return;

        await SendMailAsync(parkingPlaces, startDate, cancel);
    }

    private async Task<int> GetCountOfParkingPlacesAsync(IRepository repository, CancellationToken cancel)
    {
        _logger.LogTrace("Loading available parking places");

        return await repository.QueryCountAsync(new QueryContentRequest
        {
            Path = "/Root/Content/sample/parkingplace/parkingplaces",
            ContentQuery = "TypeIs:ParkingPlace",
        }, cancel);
    }
    private async Task<int> GetCountOfBookingsAsync(DateTime date, IRepository repository, CancellationToken cancel)
    {
        _logger.LogTrace("Loading book count for the day {startdate}", date.ToString("yyyy-MM-dd"));

        return await repository.QueryCountAsync(new QueryContentRequest
        {
            Path = "/Root/Content/sample/parkingplace/bookings",
            ContentQuery = $"+TypeIs:ParkingPlaceBooking " +
                           $"+ParkingPlaceBookingStart:>='{date:yyyy-MM-dd}' " +
                           $"+ParkingPlaceBookingStart:<'{date.AddDays(1):yyyy-MM-dd}'",
        }, cancel);
    }


    private async Task SendMailAsync(int contentCount, DateTime date, CancellationToken cancel)
    {
        _logger.LogInformation("Sending mail to Parking Place Administrator about overloading (not implemented).");
    }
}
