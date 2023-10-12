using Microsoft.AspNetCore.Mvc;
using ParkingPlaceEventHandler;
using SenseNet.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<ParkingPlaceService>();

builder.Services.AddSenseNetClientWithUserRepositories(options =>
    {
        builder.Configuration.Bind("sensenet:repository", options);
    },
    contentTypes =>
    {
        contentTypes.Add<ParkingPlaceBooking>();
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapPost("ParkingPlaceService", async (
    [FromBody] ParkingPlaceChanged requestBody, ParkingPlaceService service, HttpContext httpContext) =>
{
    await service.HandlePostAsync(requestBody, httpContext);
});

app.Run();
