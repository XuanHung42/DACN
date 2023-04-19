using FluentValidation;
using ManageProject.API.Models;
using ManageProject.API.Models.Users;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Users;
using ManageProject.WebApi.Filters;
using MapsterMapper;
using System.Net;

namespace ManageProject.API.Endpoints
{
    public static class UserEndpoint
    {
        public static WebApplication MapUserEnpoints(this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/users");
            routeGroupBuilder.MapGet("/", GetUsers)
                .WithName("GetUsers")
                .Produces<ApiResponse<PaginationResult<UserItem>>>();
            routeGroupBuilder.MapGet("/{id:int}", GetUserDetail)
               .WithName("GetUserById")
               .Produces<ApiResponse<UserItem>>();
            routeGroupBuilder.MapPut("/{id:int}", UpdateUser)
            .WithName("UpdateAUser")
            .AddEndpointFilter<ValidatorFilter<UserEditModel>>()

            .Produces(401)
            .Produces<ApiResponse<string>>();
            routeGroupBuilder.MapDelete("/", DeleteUser)
            .WithName("DeleteAnAuthor")
            .Produces(401)
            .Produces<ApiResponse<string>>();
            return app;
        }

        public static async Task<IResult> GetUserList(IUserRepository userRepository)
        {
            var user = await userRepository.GetUserAsync();
            return Results.Ok(ApiResponse.Success(user));
        }

        public static async Task<IResult> GetUsers(
            [AsParameters] UserFilterModel model, 
            IUserRepository userRepository)
        {
            var userList = await userRepository.GetPagedUserAsync(model, model.Name);
            var paginationResult = new PaginationResult<UserItem>(userList);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }
        public static async Task<IResult> GetUserDetail(int id, IUserRepository userRepository,IMapper mapper)
        {
            var user = await userRepository.GetUserByIdAsync(id);
            return user == null
               ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy người dùng có mã số {id}"))
               : Results.Ok(ApiResponse.Success(mapper.Map<UserItem>(user)));
        }

        private static async Task<IResult> UpdateUser(int id, UserEditModel model, IValidator<UserEditModel> validator,
            IUserRepository userRepository, IMapper mapper)
        {

            var validationResult = await validator.ValidateAsync(model);
            if (!validationResult.IsValid)
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, validationResult));
            }

            if (await userRepository.IsUserSlugExistedAsync(id, model.UrlSlug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict, $"Slug {model.UrlSlug} đã được sử dụng"));
            }

            var user = mapper.Map<User>(model);
            user.Id = id;
            return await userRepository.AddOrUpdateAsync(user)
                ? Results.Ok(ApiResponse.Success("User is updated", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Could not find user"));
        }
        private static async Task<IResult> DeleteUser(int id, IUserRepository userRepository)
        {
            return await userRepository.DeleteUserAsync(id)
                ? Results.Ok(ApiResponse.Success("User is delete  ", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Could not find user"));
        }
    }
}
