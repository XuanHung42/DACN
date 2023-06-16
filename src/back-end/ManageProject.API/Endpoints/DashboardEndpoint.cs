using ManageProject.API.Models;
using ManageProject.API.Models.Dashboard;
using ManageProject.Services.Manage.Departments;
using ManageProject.Services.Manage.Posts;
using ManageProject.Services.Manage.Projects;
using ManageProject.Services.Manage.Users;

namespace ManageProject.API.Endpoints
{
	public static class DashboardEndpoint
	{
		public static WebApplication MapDashboardEndpoint(this WebApplication app)
		{
			var routeGroupBuilder = app.MapGroup("/api/dashboard");
			routeGroupBuilder.MapGet("/", GetInfoDashboard)
				.WithName("GetInfoDashboard")
				.Produces<DashboardModel>();

			return app;
		
		}

		private static async Task<IResult> GetInfoDashboard(
			IDepartmentRepository departmentRepository,
			IPostRepository postRepository,
			IProjectRepository projectRepository,
			IUserRepository userRepository
			)
		{
			var result = new DashboardModel()
			{
				CountDepartment = await departmentRepository.CountTotalDepartmentAsync(),
				CountPost = await postRepository.CountTotalPostAsync(),
				CountProject = await projectRepository.CountTotalProjectAsync(),
				CountProjectNotRegister = await projectRepository.CountTotalProjectNotRegisterAsync(),
				CountProjectRegister = await projectRepository.CountTotalProjectRegister(),
				CountUser = await userRepository.CountTotalUserAsync(),

			};

			return Results.Ok(ApiResponse.Success(result));
		}
	}
}
