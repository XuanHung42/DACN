using ManageProject.API.Models;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Posts;

namespace ManageProject.API.Endpoints
{
	public static class PostEndpoint
	{
		public static WebApplication MapPostEndpoints(this WebApplication app)
		{
			var routeGroupBuilder = app.MapGroup("/api/posts");
			routeGroupBuilder.MapGet("/getAll", GetAllProjectAsync)
			.WithName("GetAllProjectAsync")
			.Produces<ApiResponse<PaginationResult<PostItem>>>();


			return app;
		}


		// get all project
		private static async Task<IResult> GetAllProjectAsync(IPostRepository postRepository)
		{
			var postList = await postRepository.GetAllPostAsync();
			return Results.Ok(ApiResponse.Success(postList));
		}

	}
}
