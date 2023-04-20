using ManageProject.Data.Contexts;
using ManageProject.Services.Manage.Users;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using ManageProject.Services.Media;
using ManageProject.Services.Timing;
using ManageProject.Data.Seeders;

using Microsoft.Extensions.Options;

using ManageProject.Services.Manage.Departments;
using ManageProject.Services.Manage.Projects;
using ManageProject.Services.Manage.Processes;


namespace ManageProject.API.Extensions
{
    public static class WebApplicationExtensions
    {
        public static WebApplicationBuilder ConfigureServices(this WebApplicationBuilder builder)
        {
            builder.Services.AddMemoryCache();
            builder.Services.AddDbContext<ManageDbContext>(options =>
             options.UseSqlServer(
               builder.Configuration
                 .GetConnectionString("DefaultConnection")));
            builder.Services.AddScoped<IDataSeeder, DataSeeder>();
    
            builder.Services.AddScoped<ITimeProvider, LocalTimeProvider>();
            builder.Services.AddScoped<IMediaManager, LocalFileSystemMediaManager>();
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            // department
            builder.Services.AddScoped<IDepartmentRepository, DepartmentRepository>();
            // project
            builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
            // process
            builder.Services.AddScoped<IProcessRepository, ProcessRepository>();

            return builder;
        }
        public static WebApplicationBuilder ConfigureCors(this WebApplicationBuilder builder)
        {
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("ManageProjectApp", policyBuilder =>
            policyBuilder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
            });
            return builder;
        }
        // cau hinh viec su dung NLog
  //      public static WebApplicationBuilder ConfigureNLog(this WebApplicationBuilder builder)
  //      {
  //          builder.Logging.ClearProviders();
		//	builder.Host.UseNLog();
  //          return builder;

		//}

		public static WebApplicationBuilder ConfigureSwaggerOpenApi(
            this WebApplicationBuilder builder)
        {
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            return builder;
        }
        public static WebApplication SetupRequestPipeline(this WebApplication app)
        {
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseStaticFiles();
            app.UseHttpsRedirection();
            app.UseCors("ManageProjectApp");
            return app;
        }

    }
   
}
    
