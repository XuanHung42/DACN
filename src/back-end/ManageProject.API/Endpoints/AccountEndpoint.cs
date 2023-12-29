using ManageProject.API.Models;
using ManageProject.API.Models.Account;
using ManageProject.Services.Manage.Account;
using ManageProject.Services.Manage.Users;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using WebApi.JwtToken;

namespace ManageProject.API.Endpoints
{
	public static class AccountEndpoint
	{
		public static WebApplication MapAccountEndpoint (this WebApplication app)
		{
			var routeGroupBuilder = app.MapGroup("/api/account");

			routeGroupBuilder.MapPost("/register", Register)
					 .WithName("register")
					 .Produces(404)
					 .Produces<ApiResponse>();

			routeGroupBuilder.MapPost("/login", Login)
						 .WithName("Login")
						 .Produces(404)
						 .Produces<ApiResponse<UserTokenModel>>();

			return app;
		}
		private static async Task<IResult> Register(RegisterModel model,
			IUserRepository userRepository)
		{
			if (model != null)
			{
				if (await userRepository.Register(model.UserName, model.Password, model.ConfirmPassword))
				{
					//var user = await userRepository.GetUserByUserName(model.UserName);
					return Results.Ok(ApiResponse.Success(HttpStatusCode.NoContent));

				}
				else
				{
					return Results.Ok(ApiResponse.Fail(HttpStatusCode.NoContent, "Tên tài khoản đã tồn tại"));
				}
			}
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Không thể tạo tài khoản"));
		}

		private async static Task<IResult> Login(LoginModel model,
			[FromServices] IUserRepository userRepository,
			[FromServices] IUserTokenRepository userTokenRepository,
			[FromServices] IJwtTokenRepository jwtTokenRepository)
		{
			var user = await userRepository.Login(model.UserName, model.Password);
			if (user == null)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "khong tim thay tai khoan nhu vay"));
			}

			var token = await jwtTokenRepository.GenerateJwtToken(user);
			await userTokenRepository.AddOrUpdateUserToken(user.Id, token);
			return Results.Ok(ApiResponse.Success(new UserTokenModel()
			{
				Id = user.Id,
				Role = user.RoleId,
				Name = user.Name,
				//Email = user.Email,
				Token = token,
				Expired = DateTime.UtcNow.AddDays(4),
			}));
		}

	}
}
