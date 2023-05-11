using ManageProject.API.Models;
using ManageProject.API.Models.Role;
using ManageProject.Services.Manage.Projects;
using ManageProject.Services.Manage.Roles;
using Mapster;

namespace ManageProject.API.Endpoints
{
    public static class RoleEndpoint
    {

        public static WebApplication MapRoleEndpoints(this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup(".api/roles");
            routeGroupBuilder.MapGet("/all", GetRoleListAsync)
                .WithName("GetAllRole")
                .Produces<ApiResponse<RoleDto>>();
            return app;
        }

        public static async Task<IResult> GetRoleListAsync(IRoleRepository roleRepository)
        {

            var project = await roleRepository
                .GetRoleAsync(role => role.ProjectToType<RoleDto>());
            return Results.Ok(ApiResponse.Success(project));

        }
    }
}
