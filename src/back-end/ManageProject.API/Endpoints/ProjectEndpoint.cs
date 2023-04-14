using ManageProject.API.Models;
using ManageProject.API.Models.Project;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Projects;
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
			.Produces<ApiResponse<PaginationResult<ProjectItem>>>();

		// get required paging
		routeGroupBuilder.MapGet("/", GetProjects)
			.WithName("GetProjects")
			.Produces<ApiResponse<ProjectItem>>();

		// get project by id
		routeGroupBuilder.MapGet("/{id:int}", GetProjectById)
			.WithName("GetProjectById")
			.Produces < ApiResponse<ProjectItem>>();

		return app;
	}

	// get project not required
	public static async Task<IResult> GetProjectNotRequired(IProjectRepository projectRepository)
	{
		var project = await projectRepository.GetProjectAsync();
		return Results.Ok(ApiResponse.Success(project));
	}

	// get project required paging
	private static async Task<IResult> GetProjects(
		[AsParameters] ProjectFilterModel model,
		IProjectRepository projectRepository
		)
	{
		var projectList = await projectRepository.GetPagedProjectsAsync(model, model.Name);

		var pagingnationResult = new PaginationResult<ProjectItem>(projectList);
		return Results.Ok(ApiResponse.Success(pagingnationResult));
	}
	
	// get project by id
	private static async Task<IResult> GetProjectById(int id, IProjectRepository projectRepository, IMapper mapper)
	{
		var project = await projectRepository.GetProjectByIdAsync(id);

		return project == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không tìm project có id nhập vào"))
			: Results.Ok(ApiResponse.Success(mapper.Map<ProjectItem>(project)));
	}


}
