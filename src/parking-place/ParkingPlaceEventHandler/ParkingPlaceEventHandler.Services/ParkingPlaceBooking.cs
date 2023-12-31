﻿using Microsoft.Extensions.Logging;
using SenseNet.Client;

namespace ParkingPlaceEventHandler.Services;

public class ParkingPlaceBooking : Content
{
    public ParkingPlaceBooking(IRestCaller restCaller, ILogger<Content> logger) : base(restCaller, logger) { }

    public DateTime ParkingPlaceBookingStart { get; set; }
    public DateTime ParkingPlaceBookingEnd { get; set; }
    public Content ParkingPlaceUser { get; set; }
    public Content ParkingPlace { get; set; }
}
