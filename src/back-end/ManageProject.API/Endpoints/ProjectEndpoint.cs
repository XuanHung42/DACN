using ManageProject.API.Models;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Projects;

namespace ManageProject.API.Endpoints;

public static class ProjectEndpoint
{
	public static WebApplication MapProjectEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/projects");

		// get project not required
		routeGroupBuilder.MapGet("/", GetProjectNotRequired)
			.WithName("GetProjectNotRequired")
			.Produces<ApiResponse<PaginationResult<ProjectItem>>>();



		return app;
	}

	// get project not required
	public static async Task<IResult> GetProjectNotRequired(IProjectRepository projectRepository)
	{
		var project = await projectRepository.GetProjectAsync();
		return Results.Ok(ApiResponse.Success(project));
	}

}
