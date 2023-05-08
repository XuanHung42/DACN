using ManageProject.API.Models;
using ManageProject.API.Models.Post;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Posts;
using Mapster;

namespace ManageProject.API.Endpoints
{
	public static class PostEndpoint
	{
		public static WebApplication MapPostEndpoints(this WebApplication app)
		{
			var routeGroupBuilder = app.MapGroup("/api/posts");
			routeGroupBuilder.MapGet("/", GetAllPostsAsync)
			   .WithName("GetAllPostsAsync")
			   .Produces<ApiResponse<PaginationResult<PostDto>>>();


			return app;
		}


		// get all project
		private static async Task<IResult> GetAllPostsAsync(IPostRepository postRepository)
		{
			var post = await postRepository.GetAllPostAsync(
				post => post.ProjectToType<PostDto>());

			return Results.Ok(ApiResponse.Success(post));
		}

	}
}
