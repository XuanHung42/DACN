using ManageProject.API.Models;
using ManageProject.API.Models.Project;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Projects;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
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

		// get required paging
		routeGroupBuilder.MapGet("/", GetProjectAsync)
			.WithName("GetProjectAsync")
			.Produces<ApiResponse<ProjectDto>>();

		//  get by id
		routeGroupBuilder.MapGet("/{id:int}", GetDetailProjectById)
			.WithName("GetDetailProjectById")
			.Produces<ApiResponse<ProjectDto>>();
		
		// get by slug
		routeGroupBuilder.MapGet("/byslug/{slug:regex(^[a-z0-9_-]+$)}", GetDetailProjectBySlug)
			.WithName("GetDetailProjectBySlug")
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
	
	// get project by id
	private static async Task<IResult> GetDetailProjectById(
		int id, IProjectRepository projectRepository, IMapper mapper)
	{
		var project = await projectRepository.GetCachedProjectByIdAsync(id, true);

		var projectQuery = mapper.Map<ProjectDto>(project);

		return projectQuery == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy id"))
			: Results.Ok(ApiResponse.Success(mapper.Map<ProjectDto>(project)));
	}

	// get project by slug

	private static async Task<IResult> GetDetailProjectBySlug(
		[FromRoute] string slug,
		IProjectRepository projectRepository,
		IMapper mapper)
	{
		var projectList = await projectRepository.GetProjectBySlugAsync(slug);

		return projectList == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không tìm thấy slug"))
			: Results.Ok(ApiResponse.Success(mapper.Map<ProjectDto>(projectList)));
	}
}
