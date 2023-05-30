using ManageProject.API.Endpoints;
using ManageProject.API.Extensions;
using ManageProject.API.Mapsters;
using ManageProject.API.Validations;
using ManageProject.Data.Seeders;
using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);
{
    builder
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

    app.MapDepartmentEndpoints();

    app.MapProjectEndpoints();

    app.MapProcessEndpoints();
    app.MapRoleEndpoints();

    app.MapPostEndpoints();
    app.MapDashboardEndpoint();
    app.MapAccountEndpoint();

	using (var scope = app.Services.CreateScope())
    {
        var seeder = scope.ServiceProvider.GetRequiredService<IDataSeeder>();
        seeder.Initialize();
    }
    app.Run();

}
