using ManageProject.API.Models;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Departments;

namespace ManageProject.API.Endpoints;

public static class DepartmentEndpoint
{
	public static WebApplication MapDepartmentEndpoints (
		this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/departments");


		// get department not required
		routeGroupBuilder.MapGet("/", GetDepartmentNotRequired)
			.WithName("GetDepartmentNotRequired")
			.Produces<ApiResponse<IList<DepartmentItem>>>();




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


}
