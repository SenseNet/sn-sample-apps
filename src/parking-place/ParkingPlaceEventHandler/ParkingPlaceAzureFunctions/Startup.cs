using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ParkingPlaceEventHandler.Services;
using SenseNet.Extensions.DependencyInjection;
using System.IO;

[assembly: FunctionsStartup(typeof(ParkingPlaceAzureFunctions.Startup))]

namespace ParkingPlaceAzureFunctions
{
    public class Startup : FunctionsStartup
    {
        public override void ConfigureAppConfiguration(IFunctionsConfigurationBuilder builder)
        {
            base.ConfigureAppConfiguration(builder);

            var context = builder.GetContext();

            builder.ConfigurationBuilder
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, "appsettings.json"), optional: true, reloadOnChange: false)
                .AddJsonFile(Path.Combine(context.ApplicationRootPath, $"appsettings.{context.EnvironmentName}.json"), optional: true, reloadOnChange: false)
                .AddUserSecrets<Startup>()
                .AddEnvironmentVariables();
        }

        public override void Configure(IFunctionsHostBuilder builder)
        {
            var configuration = builder.GetContext().Configuration;

            builder.Services.AddHttpClient();

            builder.Services.AddSingleton<ParkingPlaceService>();

            builder.Services.AddOptions<ParkingPlaceOptions>()
                .Configure<IConfiguration>((settings, config) =>
                {
                    config.GetSection("ParkingPlace").Bind(settings);
                });

            builder.Services.AddSenseNetClientWithUserRepositories(options =>
                    {
                        configuration.Bind("sensenet:repository", options);
                    },
                    contentTypes =>
                    {
                        contentTypes.Add<ParkingPlaceEventHandler.Services.ParkingPlaceBooking>();
                    })
                .AddSenseNetEmailSender(options => configuration.Bind("sensenet:Email", options));
        }
    }
}