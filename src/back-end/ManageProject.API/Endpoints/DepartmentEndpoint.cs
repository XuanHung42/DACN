using FluentValidation;
using ManageProject.API.Models;
using ManageProject.API.Models.Department;
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
		routeGroupBuilder.MapGet("/getall", GetAllDepartment)
			.WithName("GetAllDepartment")
			.Produces<ApiResponse<PaginationResult<DepartmentDto>>>();

		// get department required paging

		routeGroupBuilder.MapGet("/", GetDepartments)
			.WithName("GetDepartments")
			.Produces<ApiResponse<IList<DepartmentItem>>>();

		// get by id
		routeGroupBuilder.MapGet("/{id:int}", GetDepartmentById)
			.WithName("GetDepartmentById")
			.Produces<ApiResponse<DepartmentItem>>();

		// get user by slug department

		routeGroupBuilder.MapGet("/user/{slug:regex(^[a-z0-9_-]+$)}", GetUserByDepartmentSlug)
			.WithName("GetUserByDepartmentSlug")
			.Produces<ApiResponse<PaginationResult<UserDto>>>();

		// get post by slug department
		routeGroupBuilder.MapGet("/post/{slug:regex(^[a-z0-9_-]+$)}", GetPostByDepartmentSlug)
			.WithName("GetPostByDepartmentSlug")
			.Produces<ApiResponse<PaginationResult<PostDto>>>();

		// put add new department
		routeGroupBuilder.MapPost("/", AddNewDepartment)
			.WithName("AddNewDepartment")
			.AddEndpointFilter<ValidatorFilter<DepartmentEditModel>>()
			.Produces(401)	// thieu thong tin xac thuc hop le voi cac truong can nhap vao
			.Produces<ApiResponse<DepartmentItem>>();

		// update a department
		routeGroupBuilder.MapPut("/{id:int}", UpdateDepartment)
			.WithName("UpdateDepartment")
			.Produces(401)
			.Produces<ApiResponse<string>>();

		// delete department
		routeGroupBuilder.MapDelete("/{id:int}", DeleteDepartment)
			.WithName("DeleteDepartment")
			.Produces(401)
			.Produces<ApiResponse<string>>();

		// get detail department
		routeGroupBuilder.MapGet("/slugDetail/{slug:regex(^[a-z0-9_-]+$)}", GetDetailDepartment)
				.WithName("GetDetailDepartment")
				.Produces<ApiResponse<DepartmentDetail>>();
		return app;
	}

	// get department not required
	private static async Task<IResult> GetAllDepartment(
		IDepartmentRepository departmentRepository
		)
	{
		var department = await departmentRepository.GetAllDepartmentAsync(
			department => department.ProjectToType<DepartmentDto>());
		return Results.Ok(ApiResponse.Success(department));
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


	// update department by id
	private static async Task<IResult> UpdateDepartment(
		int id, DepartmentEditModel model,
		IValidator<DepartmentEditModel> validator,
		IDepartmentRepository departmentRepository,
		IMapper mapper
		)
	{
		var validatorResult = await validator.ValidateAsync(model);
		if (!validatorResult.IsValid)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, validatorResult));
		}

		if (await departmentRepository.IsDepartmentSlugExistedAsync(0, model.UrlSlug))
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
				$"Slug '{model.UrlSlug}' này đã được sử dụng "));
		}

		var department = mapper.Map<Department>(model);
		department.Id = id;

		return await departmentRepository.AddOrUpdateDepartment(department)
			? Results.Ok(ApiResponse.Success("Department cập nhật thành công", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy department"));

	}

	// delete department by id
	private static async Task<IResult> DeleteDepartment(
		int id, IDepartmentRepository departmentRepository
		)
	{
		return await departmentRepository.DeleteDepartmentByIdAsync(id)
			? Results.Ok(ApiResponse.Success("Department đã được xoá", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Không tìm thấy department"));
	}

	// get details by slug
	private static async Task<IResult> GetDetailDepartment(
		[FromRoute] string slug,
		IDepartmentRepository departmentRepository, IMapper mapper)
	{
		var department = await departmentRepository.GetDetailDepartmentBySlug(slug);
		return department == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy slug = {slug}"))
			: Results.Ok(ApiResponse.Success(mapper.Map<DepartmentDetail>(department)));
	}

}
