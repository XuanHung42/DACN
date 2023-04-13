using ManageProject.API.Models;
using ManageProject.API.Models.Departments;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Departments;
using MapsterMapper;
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

		// get by slug

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

	// get by slug

}
