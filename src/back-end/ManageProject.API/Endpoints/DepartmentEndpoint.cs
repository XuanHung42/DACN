using ManageProject.API.Models;
using ManageProject.API.Models.Departments;
using ManageProject.API.Models.Post;
using ManageProject.API.Models.Users;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Departments;
using ManageProject.Services.Manage.Users;
using ManageProject.WebApi.Filters;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace ManageProject.API.Endpoints;

public static class DepartmentEndpoint
{
	public static WebApplication MapDepartmentEndpoints(
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/departments");


		// get department not required
		routeGroupBuilder.MapGet("/notpaging", GetDepartmentNotRequired)
			.WithName("GetDepartmentNotRequired")
			.Produces<ApiResponse<PaginationResult<DepartmentItem>>>();

		// get department required paging

		routeGroupBuilder.MapGet("/", GetDepartments)
			.WithName("GetDepartments")
			.Produces<ApiResponse<IList<DepartmentItem>>>();

		// get by id
		routeGroupBuilder.MapGet("/{id:int}", GetDepartmentById)
			.WithName("GetDepartmentById")
			.Produces<ApiResponse<DepartmentItem>>();

		// get user by slug department

		routeGroupBuilder.MapGet("/{slug:regex(^[a-z0-9_-]+$)}/user", GetUserByDepartmentSlug)
			.WithName("GetUserByDepartmentSlug")
			.Produces<ApiResponse<PaginationResult<UserDto>>>();

		// get post by slug department
		routeGroupBuilder.MapGet("/{slug:regex(^[a-z0-9_-]+$)}/post", GetPostByDepartmentSlug)
			.WithName("GetPostByDepartmentSlug")
			.Produces<ApiResponse<PaginationResult<PostDto>>>();

		// put add new department
		routeGroupBuilder.MapPost("/", AddNewDepartment)
			.WithName("AddNewDepartment")
			.AddEndpointFilter<ValidatorFilter<DepartmentEditModel>>()
			.Produces(401)	// thieu thong tin xac thuc hop le voi cac truong can nhap vao
			.Produces<ApiResponse<DepartmentItem>>();

		return app;
	}

	// get department not required
	private static async Task<IResult> GetDepartmentNotRequired(
		IDepartmentRepository departmentRepository
		)
	{
		var departmentList = await departmentRepository.GetDepartmentAsync();
		return Results.Ok(ApiResponse.Success(departmentList));
	}

	// get department required paging
	private static async Task<IResult> GetDepartments(
		[AsParameters] DepartmentFilterModel model,
		IDepartmentRepository departmentRepository)
	{
		var departmentList = await departmentRepository.GetPagedDepartmentAsync(model, model.Name);

		var pagingnationResult = new PaginationResult<DepartmentItem>(departmentList);
		return Results.Ok(ApiResponse.Success(pagingnationResult));

	}

	// get by id
	private static async Task<IResult> GetDepartmentById(
			int id, IDepartmentRepository departmentRepository, IMapper mapper
		)
	{
		var department = await departmentRepository.GetDepartmentByIdAsync(id);
		return department == null 
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy khoa có mã số '{id}'"))
			:Results.Ok(ApiResponse.Success(mapper.Map<DepartmentItem>(department)));
	}

	// get user by slug department
	private static async Task<IResult> GetUserByDepartmentSlug(
		[FromRoute] string slug,
		[AsParameters] PagingModel pagingModel,
		IDepartmentRepository departmentRepository
		)
	{
		var userQuery = new UserQuery()
		{
			DepartmentSlug = slug
		};
		var userList = await departmentRepository.GetPagedUserAsync(
			userQuery, pagingModel,
			user => user.ProjectToType<UserDto>());

		var paginationResut = new PaginationResult<UserDto>(userList);

		//return Results.Ok(ApiResponse.Success(paginationResut));

		return userList == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Ko tồn tại slug '{slug}'"))
			: Results.Ok(ApiResponse.Success(paginationResut));
	}

	// get post by slug department
	private static async Task<IResult> GetPostByDepartmentSlug(
		[FromRoute] string slug,
		[AsParameters] PagingModel pagingModel,
		IDepartmentRepository departmentRepository
		)
	{
		var postQuery = new PostQuery()
		{
			DepartmentSlug = slug
		};
		var postList = await departmentRepository.GetPagedPostAsync(
			postQuery, pagingModel, post => post.ProjectToType<PostDto>());
		var paginationResut = new PaginationResult<PostDto>(postList);

		return Results.Ok(ApiResponse.Success(paginationResut));
	}

	// add new department
	private static async Task<IResult> AddNewDepartment(
		DepartmentEditModel model, IDepartmentRepository departmentRepository,
		IMapper mapper
		)
	{
		if (await departmentRepository.IsDepartmentSlugExistedAsync(0, model.UrlSlug))
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
				$"Slug '{model.UrlSlug}' này đã được sử dụng "));
		}

		var department = mapper.Map<Department>(model);
		await departmentRepository.AddOrUpdateDepartment(department);

		return Results.Ok(ApiResponse.Success(mapper.Map<DepartmentItem>(department), HttpStatusCode.Created));
	}
}
