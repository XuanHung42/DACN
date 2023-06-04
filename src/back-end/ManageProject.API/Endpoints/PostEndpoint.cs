﻿using ManageProject.API.Models;
using ManageProject.API.Models.Department;
using ManageProject.API.Models.Post;
using ManageProject.API.Models.Users;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Posts;
using ManageProject.Services.Media;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using SlugGenerator;
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
            routeGroupBuilder.MapPost("/", AddOrUpdatePost)
                .WithName("AddANewPost")
                //.AddEndpointFilter<ValidatorFilter<UserEditModel>>()
                .Produces(401)
        .Accepts<PostEditModel>("multipart/form-data")

                .Produces<ApiResponse<PostItem>>();
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
		private static async Task<IResult> AddOrUpdatePost(HttpContext context, IPostRepository postRepository,
			IMapper mapper, IMediaManager media)
		{
			var model = await PostEditModel.BindAsync(context);
			var slug = model.Title.GenerateSlug();
			if(await postRepository.IsPostSlugIsExistedAsync(model.Id, slug))
			{
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
                   $"Slug '{slug}' đã tôn tại"));
            }

			var post = model.Id >0
				? await postRepository.GetPostByIdAsync(model.Id) : null;
			if(post == null)
			{
				post = new Post();
			}
			post.Title = model.Title;
			post.UrlSlug = model.UrlSlug ?? slug;
			post.UserId = model.UserId;
			post.ShortDescription = model.ShortDescription;
			post.Status= model.Status;
			post.Created= DateTime.Now;
			if (model.File?.Length > 0)
			{
                string hostname = $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                   uploadedPath = await media.SaveFileAsync(
						model.File.OpenReadStream(), model.File.FileName, model.File.ContentType);
				if(!string.IsNullOrWhiteSpace(uploadedPath))
				{
					post.File= uploadedPath;
				}
			}
			await postRepository.CreateOrUpdatePostAsync(post);
			return Results.Ok(ApiResponse.Success(mapper.Map<PostItem>(post), HttpStatusCode.Created));
		}

	}
}
