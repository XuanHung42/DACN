using ManageProject.API.Models;
using ManageProject.API.Models.Project;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Processes;
using ManageProject.Services.Manage.Projects;
using ManageProject.Services.Media;
using ManageProject.WebApi.Filters;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using SlugGenerator;
using System.Net;

namespace ManageProject.API.Endpoints;

public static class ProjectEndpoint
{
	public static WebApplication MapProjectEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/projects");

		// get project not required
		routeGroupBuilder.MapGet("/getAll", GetProjectNotRequired)
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

		//// add or update post
		//routeGroupBuilder.MapPost("/", AddOrUpdateProject)
		//	.WithName("AddOrUpdateProject")
		//	.Accepts<ProjectEditModel>("multipart/form-data")
		//	.Produces(401)
		//	.Produces<ApiResponse<ProjectDetail>>();

		routeGroupBuilder.MapPost("/", CreateNewProject)
			.WithName("CreateNewProject")
			.AddEndpointFilter<ValidatorFilter<ProjectEditModel>>()
			.Produces(401)
			.Produces<ApiResponse<ProjectDto>>();


		// delete project
		routeGroupBuilder.MapDelete("/{id:int}", DeleteProject)
			.WithName("DeleteProject")
			.Produces(401)
			.Produces<ApiResponse<string>>();


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

		var projectList = await projectRepository.GetPagedProjectAsync<ProjectDto>(projectQuery, model,
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
		var projectQuery = mapper.Map<ProjectDto>(projectList);

		return projectQuery == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không tìm thấy slug"))
			: Results.Ok(ApiResponse.Success(mapper.Map<ProjectDto>(projectList)));
	}

	//// create new project or update
	//private static async Task<IResult> AddOrUpdateProject (HttpContext context,
	//	IProjectRepository projectRepository, IMapper mapper
	//	)
	//{
	//	var model = await ProjectEditModel.BindAsync(context);
	//	var slug = model.Name.GenerateSlug();
	//	if (await projectRepository.CheckSlugExistedAsync(model.Id, slug))
	//	{
	//		return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
	//			$"Slug '{slug}' da duoc su dung cho project khac"));
	//	}

	//	var project = model.Id > 0
	//		? await projectRepository.GetProjectByIdAsync(model.Id) : null;

	//	project.Name = model.Name;
	//	project.UrlSlug = model.Name.GenerateSlug();
	//	project.Description = model.Description;
	//	project.ShortDescription = model.ShortDescription;
	//	project.CostProject = model.CostProject;
	//	project.UserNumber = model.UseNumber;
	//	project.Register = model.Register;


	//	await projectRepository.CreateOrUpdateProjectAsync(project, model.GetSlectedUser());

	//	return Results.Ok(ApiResponse.Success(mapper.Map<ProjectDetail>(project), HttpStatusCode.Created));
	//}



	private static async Task<IResult> CreateNewProject(
		ProjectEditModel model, 
		IProjectRepository projectRepository, 
		IProcessRepository processRepository,
		IMapper mapper)
	{
		if (await projectRepository.CheckSlugExistedAsync(0, model.UrlSlug))
		{
			return Results.Ok(ApiResponse.Fail(
				HttpStatusCode.Conflict,$"Slug '{model.UrlSlug} đã được sử dụng'"));
		}
		if (await processRepository.GetProcessByIdAsync(model.ProcessId) == null)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
				$"Không tìm thấy proceess có id = {model.ProcessId}"));
		}
		var project = mapper.Map<Project>(model);
		await projectRepository.CreateOrUpdateProjectAsync	(project, model.GetSelectedUsers());

		return Results.Ok(ApiResponse.Success(mapper.Map<ProjectDto>(project), HttpStatusCode.Created));
	}


	// delete project by id
	private static async Task<IResult> DeleteProject(
		int id, IProjectRepository projectRepository)
	{
		return await projectRepository.DeleteProjectByIdAsync(id)
			? Results.Ok(ApiResponse.Success("Project đã được xoá ", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Khong tim thay project"));
	}
	
}
