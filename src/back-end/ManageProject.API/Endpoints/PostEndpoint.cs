using ManageProject.API.Models;
using ManageProject.API.Models.Department;
using ManageProject.API.Models.Post;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Posts;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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

			routeGroupBuilder.MapGet("/filter", GetPostFilterAsync)
				.WithName("GetPostFilterAsync")
				.Produces<ApiResponse<IList<PostItem>>>();

			// get details by slug
			routeGroupBuilder.MapGet("/slugDetail/{slug:regex(^[a-z0-9_-]+$)}", GetDetailPostAsync)
				.WithName("GetDetailPostAsync")
				.Produces<ApiResponse<PostDetail>>();

			routeGroupBuilder.MapGet("topView/{limit:int}", GetLimitNViewCount)
			.WithName("GetLimitNViewCount")
			.Produces<ApiResponse<IList<PostDto>>>();

			routeGroupBuilder.MapGet("newPost/{limit:int}", GetLimitNByNewId)
			.WithName("GetLimitNByNewId")
			.Produces<ApiResponse<IList<PostDto>>>();

			return app;
		}


		// get all project
		private static async Task<IResult> GetAllPostsAsync(IPostRepository postRepository)
		{
			var post = await postRepository.GetAllPostAsync(
				post => post.ProjectToType<PostDto>());

			return Results.Ok(ApiResponse.Success(post));
		}

		// get filter
		private static async Task<IResult> GetPostFilterAsync(
			[AsParameters] PostFilterModel model, 
			IPostRepository postRepository)
		{
			var postList = await postRepository.GetPostPagedFilterAsync(model, model.Title);

			var pagingnationResult = new PaginationResult<PostItem>(postList);
			return Results.Ok(ApiResponse.Success(pagingnationResult));

		}

		// get detail by slug
		private static async Task<IResult> GetDetailPostAsync(
			[FromRoute] string slug, 
			IPostRepository postRepository, IMapper mapper)
		{
			var post = await postRepository.GetPostDetailBySlug(slug);
			return post == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy slug = {slug}"))
			: Results.Ok(ApiResponse.Success(mapper.Map<PostDetail>(post)));
		}

		// get limit by viewCount
		private static async Task<IResult> GetLimitNViewCount(int limit, 
			IPostRepository postRepository, ILogger<IResult> logger)
		{
			var postViewCount = await postRepository.GetNLimitTopViewCount(limit,
				p => p.ProjectToType<PostDto>());
			return Results.Ok(ApiResponse.Success(postViewCount));
		}

		// get limit by id 
		private static async Task<IResult> GetLimitNByNewId(int limit, 
			IPostRepository postRepository, ILogger<IResult> logger)
		{
			var descId = await postRepository.GetNLimitByNewId(limit,
				p => p.ProjectToType<PostDto>());
			return Results.Ok(ApiResponse.Success(descId));
		}

	}
}
