using FluentValidation;
using ManageProject.API.Models;
using ManageProject.API.Models.Process;
using ManageProject.Core.Collections;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Processes;
using ManageProject.WebApi.Filters;
using MapsterMapper;
using System.Net;

namespace ManageProject.API.Endpoints;

public static class ProcessEndpoint
{
	public static WebApplication MapProcessEndpoints(this WebApplication app)
	{
		var routeGroupBuilder = app.MapGroup("/api/processes");

		////get not required
		routeGroupBuilder.MapGet("/notrequired", GetProcessNotRequired)
			.WithName("GetProcessNotRequired")
			.Produces<ApiResponse<ProcessItem>>();

		// get process by id
		routeGroupBuilder.MapGet("/{id:int}", GetProcessById)
			.WithName("GetProcessById")
			.Produces<ApiResponse<ProcessItem>>();

		// update process
		routeGroupBuilder.MapPut("/{id:int}", UpdateProcess)
			.WithName("UpdateProcess")
			.Produces(401)
			.Produces<ApiResponse<string>>();

		// create new process
		routeGroupBuilder.MapPost("/", AddNewProcess)
			.WithName("AddNewProcess")
			.AddEndpointFilter<ValidatorFilter<ProcessEditModel>>()
			.Produces(401)
			.Produces <ApiResponse<ProcessItem>>();
			

		return app;
	}

	// get process not required
	private static async Task<IResult> GetProcessNotRequired(IProcessRepository processRepository)
	{
		var processList = await processRepository.GetProcessAsync();
		return Results.Ok(ApiResponse.Success(processList));
	}

	// get process by id 
	private static async Task<IResult> GetProcessById(
		int id, IProcessRepository processRepository, IMapper mapper)
	{
		var process = await processRepository.GetProcessByIdAsync(id);

		return process == null
			? Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy id = {id}"))
			: Results.Ok(ApiResponse.Success(mapper.Map<ProcessItem>(process)));
	}


	// update process
	private static async Task<IResult> UpdateProcess(
		int id, ProcessEditModel model,
		IValidator<ProcessEditModel> validator,
		IProcessRepository processRepository,
		IMapper mapper)
	{
		var validatorResult = await validator.ValidateAsync(model);
		if (!validatorResult.IsValid)
		{
			return Results.Ok(ApiResponse.Fail(HttpStatusCode.BadRequest, validatorResult));
		}

		var process = mapper.Map<Process>(model);
		process.Id = id;

		return await processRepository.AddOrUpdateProcessAsync(process)
			? Results.Ok(ApiResponse.Success("Cập nhật thành công process"))
			: Results.Ok(ApiResponse.Fail(HttpStatusCode.NotFound, $"Không tìm thấy process có id = {id}"));

	}

	// add new process
	private static async Task<IResult> AddNewProcess(
		ProcessEditModel model, 
		IProcessRepository processRepository,
		IMapper mapper)
	{
		var process = mapper.Map<Process>(model);
		await processRepository.AddOrUpdateProcessAsync(process);

		return Results.Ok(ApiResponse.Success(mapper.Map<ProcessItem>(process),
			HttpStatusCode.Created));
	}
}
