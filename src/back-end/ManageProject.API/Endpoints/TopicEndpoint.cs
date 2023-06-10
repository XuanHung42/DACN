using ManageProject.API.Models;
using ManageProject.Core.DTO;
using ManageProject.Services.Manage.Topics;

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

			return app;
		}

		// get all
		private static async Task<IResult> GetAllTopicAsync(ITopicRepository topicRepository)
		{
			var topicList = await topicRepository.GetAllTopicAsync();
			return Results.Ok(ApiResponse.Success(topicList));

		}
	}
}
