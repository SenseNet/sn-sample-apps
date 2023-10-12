using SenseNet.Client;

namespace ParkingPlaceEventHandler;

public class ParkingPlaceBooking : Content
{
    public ParkingPlaceBooking(IRestCaller restCaller, ILogger<Content> logger) : base(restCaller, logger) { }

    public DateTime ParkingPlaceBookingStart { get; set; }
    public DateTime ParkingPlaceBookingEnd { get; set; }
}
