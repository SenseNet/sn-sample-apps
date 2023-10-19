# Parking Place booking event handlers
In this folder there are a couple of sample *.Net* projects that demonstrate how to handle sensenet webhook events. Both projects use the same simple service class that handles booking events. When an event is received, the code calls back to the repository for more info:

- number of available parking places
- number of booked places for that day

If the day turns out to be fully booked, the service **sends an email** to a configured admin email address with a notification.

> **Webhooks**: for these event handlers to work, you have to import and properly configure the webhooks found in the [deployment](/deployment/) folder into the sensenet content repository.

## Event handler Asp.Net web application
This is a regular Asp.Net web api [application](/src/parking-place/ParkingPlaceEventHandler/ParkingPlaceEventHandler/). Using a minimal API it defines a single entry point for a POST request and handles webhook events.\
You can deploy it anywhere where you can deploy an Asp.Net application - it just needs a URL accessible by the repository.

## Event handler Azure Function
This  [Azure function](/src/parking-place/ParkingPlaceEventHandler/ParkingPlaceAzureFunctions/) is just a different wrapper around the same event handler service: when it runs, it sends a notification to the admin if the day is fully booked. \
The advantage of using a serverless function here is that webhook handlers typically do not need to be always online and are a perfect fit for an automatically scalable cloud event handler.