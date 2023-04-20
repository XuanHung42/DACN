using ManageProject.API.Models;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Processes;

namespace ManageProject.API.Endpoints;

public static class ProcessEndpoint
{
	public static WebApplication MapProcessEndpoints(this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/processes");

		////get not required
		routeGroupBuilder.MapGet("/notrequired", GetProcessNotRequired)
			.WithName("GetProcessNotRequired")
			.Produces<ApiResponse<ProcessItem>>();

		return app;
	}

	// get process not required
	private static async Task<IResult> GetProcessNotRequired(IProcessRepository processRepository)
	{
		var processList = await processRepository.GetProcessAsync();
		return Results.Ok(ApiResponse.Success(processList));
	}
}
