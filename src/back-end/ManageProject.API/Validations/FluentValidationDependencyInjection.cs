using FluentValidation;
using System.Reflection;

namespace ManageProject.API.Validations
{
    public static class FluentValidationDependencyInjection
    {
        public static WebApplicationBuilder ConfigureFluentValdation(this WebApplicationBuilder builder)
        {
            builder.Services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
            return builder;
        }
    }
}
