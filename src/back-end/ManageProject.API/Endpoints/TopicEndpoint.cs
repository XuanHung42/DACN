using FluentValidation;
using ManageProject.API.Models;
using ManageProject.API.Models.Process;
using ManageProject.API.Models.Topic;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Processes;
using ManageProject.Services.Manage.Topics;
using ManageProject.WebApi.Filters;
using MapsterMapper;
using System.Diagnostics;
using System.Net;

namespace ManageProject.API.Endpoints
{
	public static class TopicEndpoint
	{
		public static WebApplication MapTopicEndpoints(this WebApplication app)
		{
			var routeGroupBuilder = app.MapGroup("/api/topics");

			routeGroupBuilder.MapGet("/getAll", GetAllTopicAsync)
				.WithName("GetAllTopicAsync")
				.Produces<ApiResponse<TopicItem>>();

			routeGroupBuilder.MapGet("/{id:int}", GetTopicByIdAsync)
				.WithName("GetTopicByIdAsync")
				.Produces<ApiResponse<TopicItem>>();

			routeGroupBuilder.MapPost("/", AddNewTopic)
				.WithName("AddNewTopic")
				.AddEndpointFilter<ValidatorFilter<TopicEditModel>>()
				.Produces(401)
				.Produces<ApiResponse<TopicItem>>();

			routeGroupBuilder.MapPut("/{id:int}", UpdateTopic)
				.WithName("UpdateTopic")
				.Produces(401)
				.Produces<ApiResponse<string>>();

			routeGroupBuilder.MapDelete("/{id:int}", DeleteTopic)
				.WithName("DeleteTopic")
				.Produces(401)
				.Produces<ApiResponse<string>>();


			return app;
		}

		// get all
		private static async Task<IResult> GetAllTopicAsync(ITopicRepository topicRepository)
		{
			var topicList = await topicRepository.GetAllTopicAsync();
			return Results.Ok(ApiResponse.Success(topicList));

		}
		// get by id
		private static async Task<IResult> GetTopicByIdAsync(
			int id, ITopicRepository topicRepository, IMapper mapper)
		{
			var topic = await topicRepository.GetTopicById(id);

			return topic == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy id = {id}"))
			: Results.Ok(ApiResponse.Success(mapper.Map<TopicItem>(topic)));
		}

		// add new topic
		private static async Task<IResult> AddNewTopic(TopicEditModel model,
			ITopicRepository topicRepository, IMapper mapper)
		{
			var topic = mapper.Map<Topic>(model);
			await topicRepository.AddOrUpdateTopicAsync(topic);

			return Results.Ok(ApiResponse.Success(
				mapper.Map<TopicItem>(topic), HttpStatusCode.Created));
		}

		// update topic
		private static async Task<IResult> UpdateTopic(
			int id,
			TopicEditModel model,
			IValidator<TopicEditModel> validator,
			ITopicRepository topicRepository,
			IMapper mapper)
		{
			var validatorResult = await validator.ValidateAsync(model);
			if (!validatorResult.IsValid)
			{
				return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, validatorResult));
			}

			var topic = mapper.Map<Topic>(model);
			topic.Id = id;

			return await topicRepository.AddOrUpdateTopicAsync(topic)
			? Results.Ok(ApiResponse.Success("Cập nhật thành công topic"))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy topic có id = {id}"));
		}

		// delete topic
		private static async Task<IResult> DeleteTopic(
			int id, ITopicRepository topicRepository)
		{
			return await topicRepository.DeleteTopicAsync(id)
			? Results.Ok(ApiResponse.Success("Topic có id nhập vào đã được xoá ", HttpStatusCode.NoContent))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy topic có id = {id}"));
		}
	}
}
