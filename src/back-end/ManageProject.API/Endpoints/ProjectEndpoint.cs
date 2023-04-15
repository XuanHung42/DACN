using ManageProject.API.Models;
using ManageProject.API.Models.Project;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Projects;
using Mapster;
using MapsterMapper;
using System.Net;

namespace ManageProject.API.Endpoints;

public static class ProjectEndpoint
{
	public static WebApplication MapProjectEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/projects");

		// get project not required
		routeGroupBuilder.MapGet("/notpaging", GetProjectNotRequired)
			.WithName("GetProjectNotRequired")
			.Produces<ApiResponse<PaginationResult<ProjectDto>>>();

		routeGroupBuilder.MapGet("/", GetProjectAsync)
			.WithName("GetProjectAsync")
			.Produces<ApiResponse<ProjectDto>>();
		

		return app;
	}

	// get project not required
	public static async Task<IResult> GetProjectNotRequired(IProjectRepository projectRepository)
	{
		var project = await projectRepository
			.GetProjectAsync(projects => projects.ProjectToType<ProjectDto>());
		return Results.Ok(ApiResponse.Success(project));
	}

	private static async Task<IResult> GetProjectAsync(
		[AsParameters] ProjectFilterModel model, 
		IProjectRepository projectRepository,
		IMapper mapper
		)
	{
		var projectQuery = mapper.Map<ProjectQuery>(model);

		var projectList = await projectRepository.GetPagedProjectAsync(projectQuery, model,
			projects => projects.ProjectToType<ProjectDto>());

		var pagingnationResult = new PaginationResult<ProjectDto>(projectList);

		return Results.Ok(ApiResponse.Success(pagingnationResult));
	}
	

}
