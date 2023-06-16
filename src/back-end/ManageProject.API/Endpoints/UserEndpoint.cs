﻿using FluentValidation;
using ManageProject.API.Models;
using ManageProject.API.Models.Post;
using ManageProject.API.Models.Project;
using ManageProject.API.Models.Users;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Mappings;
using ManageProject.Services.Manage.Departments;
using ManageProject.Services.Manage.Users;
using ManageProject.WebApi.Filters;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using ManageProject.API.Models.Role;
using SlugGenerator;
using Microsoft.Extensions.Hosting;
using ManageProject.Services.Media;
using ManageProject.Services.Manage.Roles;
using Microsoft.AspNetCore.Mvc.Rendering;
using ManageProject.API.Models.Departments;
using ManageProject.Services.Manage.Posts;

namespace ManageProject.API.Endpoints
{
    public static class UserEndpoint
    {
        public static WebApplication MapUserEnpoints(this WebApplication app)
        {
            var routeGroupBuilder = app.MapGroup("/api/users");
            routeGroupBuilder.MapGet("/getAll", GetUserList)
                .WithName("GetAllUsers")
                .Produces<ApiResponse<UserDetail>>();
            routeGroupBuilder.MapGet("/", GetUsers)
                .WithName("GetUsers")
                .Produces<ApiResponse<PaginationResult<UserItem>>>();
            routeGroupBuilder.MapGet("/{id:int}", GetUserDetail)
               .WithName("GetUserById")
               .Produces<ApiResponse<UserDetail>>();
            routeGroupBuilder.MapGet("/slug", GetUserBySlug)
       .WithName("GetUserBySlug")
       .Produces<ApiResponse<UserDetail>>();
            routeGroupBuilder.MapPut("/{id:int}", UpdateUser)
            .WithName("UpdateAnUser")
            .AddEndpointFilter<ValidatorFilter<UserEditModel>>()

            .Produces(401)
            .Produces<ApiResponse<string>>();
            routeGroupBuilder.MapGet("projects/{slug:regex(^[a-z0-9_-]+$)}", GetProjectByUserSlug)
                .WithName("GetProjectByUserSlug")
                 .Produces<ApiResponse<PaginationResult<ProjectDto>>>();

			routeGroupBuilder.MapGet("posts/{slug:regex(^[a-z0-9_-]+$)}", GetPostByUserSlug)
		   .WithName("GetPostByUserSlug")
			.Produces<ApiResponse<PaginationResult<PostDto>>>();


			routeGroupBuilder.MapGet("/{slug:regex(^[a-z0-9_-]+$)}/role", GetRoleByUserSlug)
                .WithName("GetRoleByUserSlug")
                 .Produces<ApiResponse<PaginationResult<RoleDto>>>();
            routeGroupBuilder.MapPost("/", AddOrUpdateUser)
                 .WithName("AddANewUser")
                 //.AddEndpointFilter<ValidatorFilter<UserEditModel>>()
                 .Produces(401)
         .Accepts<UserEditModel>("multipart/form-data")

                 .Produces<ApiResponse<UserItem>>();

            routeGroupBuilder.MapGet("/slugDetail/{slug:regex(^[a-z0-9_-]+$)}", GetDetailUserBySlugAsync)
                .WithName("GetDetailUserBySlugAsync")
			.Produces<ApiResponse<UserDetail>>();
            routeGroupBuilder.MapDelete("/{id:int}", DeleteUser)
            .WithName("DeleteAnAuthor")
            .Produces(401)
            .Produces<ApiResponse<string>>();
            routeGroupBuilder.MapPost("/{id:int}/avatar", SetUserPicture)
         .WithName("SetUserPicture")
         .Accepts<IFormFile>("multipart/form-data")
         .Produces<string>()
         .Produces(400);
            routeGroupBuilder.MapPost("/addProjects", AddProjectsToUser)
                .WithName("AddProjectToUser")
                .Produces(401)
                .Produces<ApiResponse<User>>();


			// get filter role 
			routeGroupBuilder.MapGet("/get-filter", GetFilterRoleAsync)
				.WithName("GetFilterRoleAsync")
				.Produces<ApiResponse<UserFilterModel>>();

            routeGroupBuilder.MapGet("/filterDepartment", GetFilterDepartment)
				.WithName("GetFilterDepartment")
				.Produces<ApiResponse<UserFilterModel>>();
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
            var userList = await userRepository.GetPagedUserAsync(model, model.Name, model.Email);
            var paginationResult = new PaginationResult<UserItem>(userList);
            return Results.Ok(ApiResponse.Success(paginationResult));
        }
        public static async Task<IResult> GetUserDetail(int id, IUserRepository userRepository, IMapper mapper)
        {
            var user = await userRepository.GetUserByIdAsync(id);
            return user == null
               ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy người dùng có mã số {id}"))
               : Results.Ok(ApiResponse.Success(mapper.Map<UserDetail>(user)));
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
        private static async Task<IResult> AddUser(int id, UserEditModel model, IValidator<UserEditModel> validator,
          IUserRepository userRepository, IMapper mapper)
        {

            if (await userRepository.IsUserSlugExistedAsync(0, model.UrlSlug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
                    $"Slug '{model.UrlSlug}' này đã được sử dụng "));
            }

            var user = mapper.Map<User>(model);
            await userRepository.AddOrUpdateAsync(user);

            return Results.Ok(ApiResponse.Success(mapper.Map<UserItem>(user), HttpStatusCode.Created));
        }


        private static async Task<IResult> AddOrUpdateUser(HttpContext context,
            IUserRepository userRepository, IMapper mapper, IMediaManager media)
        {
            var model = await UserEditModel.BindAsync(context);
            var slug = model.Name.GenerateSlug();
            if (await userRepository.IsUserSlugExistedAsync(model.Id, slug))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.Conflict,
                    $"Slug '{slug}' đã tôn tại"));

            }

            var user = model.Id > 0
                ? await userRepository.GetUserByIdAsync(model.Id) : null;
            if (user == null)
            {
                user = new User() ;
            }
            user.Name = model.Name;
            user.UrlSlug = model.UrlSlug;
            user.DepartmentId = model.DepartmentId;
            user.Email = model.Email;
            user.BirthDate =model.BirthDate;
            user.UrlSlug = model.Name.GenerateSlug();
            user.RoleId = model.RoleId;
            user.Password = model.Password;
            if (model.ImageFile?.Length > 0)
            {
                string hostname = $"{context.Request.Scheme}://{context.Request.Host}{context.Request.PathBase}/",
                    uploadedPath = await media.SaveFileAsync(
                        model.ImageFile.OpenReadStream(), model.ImageFile.FileName, model.ImageFile.ContentType);
                if (!string.IsNullOrWhiteSpace(uploadedPath))
                {
                    user.ImageUrl = uploadedPath;
                }

               


            }
            await userRepository.AddOrUpdateAsync(user);
            return Results.Ok(ApiResponse.Success(mapper.Map<UserItem>(user), HttpStatusCode.Created));
        }
        private static async Task<IResult> DeleteUser(int id, IUserRepository userRepository)
        {
            return await userRepository.DeleteUserAsync(id)
                ? Results.Ok(ApiResponse.Success("User is delete  ", HttpStatusCode.NoContent))
                : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Could not find user"));
        }
        private static async Task<IResult> GetProjectByUserSlug([FromRoute] string slug,
            [AsParameters] PagingModel pagingModel, IUserRepository userRepository)
        {
            var projectQuery = new ProjectQuery()
            {
                UserSlug = slug
            };
            var projectList = await userRepository.GetPagedProjectsAsync(
                projectQuery,
                pagingModel,
                project => project.ProjectToType<ProjectDto>());
            var paginationResult = new PaginationResult<ProjectDto>(projectList);
            return projectList == null
              ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Ko tồn tại slug '{slug}'"))
              : Results.Ok(ApiResponse.Success(paginationResult));
        }

        private static async Task<IResult> GetPostByUserSlug([FromRoute] string slug,
            [AsParameters] PagingModel pagingModel, IUserRepository userRepository)
        {
            var postQuery = new PostQuery()
            {
                UserSlug = slug
            };
            var postLits = await userRepository.GetPagedPostAsync(
                postQuery,
                pagingModel,
                post => post.ProjectToType<PostDto>());
            var paginationResult = new PaginationResult<PostDto>(postLits);
            return postLits == null
			    ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Ko tồn tại slug '{slug}'"))
			  : Results.Ok(ApiResponse.Success(paginationResult));
		}
        private static async Task<IResult> GetRoleByUserSlug([FromRoute] string slug,
           [AsParameters] PagingModel pagingModel, IUserRepository userRepository)
        {
            var roleQuery = new RoleQuery()
            {
                UserSlug = slug
            };
            var roleList = await userRepository.GetPageRolesAsync(
                roleQuery,
                pagingModel,
                project => project.ProjectToType<RoleDto>());
            var paginationResult = new PaginationResult<RoleDto>(roleList);
            return roleList == null
              ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Ko tồn tại slug '{slug}'"))
              : Results.Ok(ApiResponse.Success(paginationResult));
        }
        private static async Task<IResult> GetUserBySlug(
             string slug, IUserRepository userRepository, IMapper mapper)
        {
            var user = await userRepository.GetUserBySlugAsync(slug);
            return user==null
                ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound))
                :Results.Ok(ApiResponse.Success(mapper.Map<UserDetail>(user)));
        }
        private static async Task<IResult> SetUserPicture(
          int id,
          IFormFile imageFile,
          IUserRepository userRepository,
          IMediaManager mediaManager)
        {
            var imageUrl = await mediaManager.SaveFileAsync(imageFile.OpenReadStream(), imageFile.FileName, imageFile.ContentType);
            if (string.IsNullOrWhiteSpace(imageUrl))
            {
                return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, "Không lưu được tập tin"));
            }
            await userRepository.SetImageUrlAsync(id, imageUrl);
            return Results.Ok(ApiResponse.Success(imageUrl));
        }
        private static async Task<IResult> GetDetailUserBySlugAsync(
            [FromRoute] string slug, IUserRepository userRepository, IMapper mapper)
        {
            var user = await userRepository.GetUserDetailBySlug(slug);

            return user == null
            ? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy slug = {slug}"))
            : Results.Ok(ApiResponse.Success(mapper.Map<UserDetail>(user)));
        }

        // get filter role
        private static async Task<IResult> GetFilterRoleAsync(
            IRoleRepository roleRepository)
        {
            var model = new UserFilterModel()
            {
                RoleList = (await roleRepository.GetRoleNotRequired())
                .Select(r => new SelectListItem()
                {
                    Text = r.Name,
                    Value = r.Id.ToString()
                })
            };
            return Results.Ok(ApiResponse.Success(model));
        }

        // get filter department
        private static async Task<IResult> GetFilterDepartment(
            IDepartmentRepository departmentRepository)
        {
            var model = new UserFilterModel()
            {
                DepartmentList =  (await departmentRepository.GetDepartmentNotRequired())
                .Select(r => new SelectListItem()
                {
                    Text = r.Name,
                    Value = r.Id.ToString()
                })
            };
            return Results.Ok(ApiResponse.Success(model));
        }

        // test
        private static async Task<IResult> AddProjectsToUser(int userId, List<int> projectId,IUserRepository userRepository)
        {
            return await userRepository.AddProjectsToUserAsync(projectId, userId)
            ? Results.Ok(ApiResponse.Success("Projects đã được thêm vào User", HttpStatusCode.Created))
            : Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, "Đã xảy ra lỗi" + ""));

        }
       
        
    }
}

