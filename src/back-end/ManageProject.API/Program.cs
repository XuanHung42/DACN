using ManageProject.API.Endpoints;
using ManageProject.API.Extensions;
using ManageProject.API.Mapsters;
using ManageProject.API.Validations;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
{
    builder.ConfigureServices()
        .ConfigureCors()
        .ConfigureServices()
        .ConfigureSwaggerOpenApi()
        .ConfigureMapster()
        .ConfigureFluentValdation();
}

var app = builder.Build();
{
    app.SetupRequestPipeline();
    app.MapUserEnpoints();
    app.Run();

}
