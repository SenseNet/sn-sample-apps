using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ParkingPlaceEventHandler.Services;

namespace ParkingPlaceAzureFunctions
{
    public class ParkingPlaceBooking
    {
        private readonly ParkingPlaceService _parkingPlaceService;
        private readonly ILogger _logger;

        public ParkingPlaceBooking(ParkingPlaceService parkingPlaceService, ILogger<ParkingPlaceBooking> logger)
        {
            _parkingPlaceService = parkingPlaceService;
            _logger = logger;
        }

        [FunctionName("ParkingPlaceBooked")]
        public async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req)
        {
            _logger.LogTrace("ParkingPlaceBooked: loading and parsing request body.");

            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            var data = JsonConvert.DeserializeObject<ParkingPlaceChanged>(requestBody);

            _logger.LogTrace("ParkingPlaceBooked: event {eventName} arrived for content {path}.", 
                data.EventName, data.Path);

            await _parkingPlaceService.HandlePostAsync(data, req.HttpContext);

            return new OkObjectResult(null);
        }
    }
}
