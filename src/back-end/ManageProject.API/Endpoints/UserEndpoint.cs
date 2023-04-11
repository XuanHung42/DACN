using ManageProject.API.Models;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Users;

namespace ManageProject.API.Endpoints
{
    public static class UserEndpoint
    {
        public static WebApplication MapUserEnpoints(this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/users");
            routeGroupBuilder.MapGet("/", GetUserList)
                .WithName("GetUsers")
                .Produces<ApiResponse<UserItem>>();
            return app;
        }

        public static async Task<IResult> GetUserList(IUserRepository userRepository)
        {
            var user = await userRepository.GetUserAsync();
            return Results.Ok(ApiResponse.Success(user));
        }
    }
}
