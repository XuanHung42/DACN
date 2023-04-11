using FluentValidation;
using ManageProject.API.Extensions;
using ManageProject.API.Models;

namespace ManageProject.WebApi.Filters
{
    public class ValidatorFilter<T> : IEndpointFilter where T : class
    {
        private readonly IValidator<T> _validator;

        public ValidatorFilter(IValidator<T> validator)
        {
            _validator = validator;
        }


        public async ValueTask<object> InvokeAsync(
          EndpointFilterInvocationContext context,
          EndpointFilterDelegate next)
        {
            var model = context.Arguments
              .SingleOrDefault(x => x?.GetType() == typeof(T)) as T;

            if (model == null)
            {
                return Results.BadRequest(
                  new ValidationFailureResponse(
                    new[] {
              "Could not create model object"
                    }));
            }

            var validationResult = await _validator.ValidateAsync(model);

            if (!validationResult.IsValid)
            {
                return Results.BadRequest(
                  validationResult.Errors.ToResponse());
            }

            return await next(context);
        }
    }
}