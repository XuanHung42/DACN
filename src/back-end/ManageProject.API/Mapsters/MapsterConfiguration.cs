using ManageProject.API.Models.Department;
using ManageProject.API.Models.Departments;
using ManageProject.API.Models.Post;
using ManageProject.API.Models.Process;
using ManageProject.API.Models.Project;
using ManageProject.API.Models.Role;
using ManageProject.API.Models.Topic;
using ManageProject.API.Models.Users;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using Mapster;
namespace ManageProject.API.Mapsters

{
    public class MapsterConfiguration : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            config.NewConfig<User, UserDto>();
            config.NewConfig<Role, RoleDto>();

            config.NewConfig<User, UserItem>()
                .Map(dest => dest.DepartmentId, src => src.Department.Id);
            config.NewConfig<User, UserEditModel>()
     .Map(dest => dest.DepartmentId, src => src.Department.Id);
            config.NewConfig<User, UserEditModel>()
 .Map(dest => dest.RoleId, src => src.Role.Id);
            config.NewConfig<Project, ProjectEditModel>()
.Map(dest => dest.ProcessId, src => src.Process.Id);
            config.NewConfig<Department, DepartmentDto>().MaxDepth(3);
            config.NewConfig<Department, DepartmentDetail>();
            config.NewConfig<Department, DepartmentItem>()
                .Map(dest => dest.Id, src => src.Id);
            config.NewConfig<DepartmentEditModel, Department>();

            config.NewConfig<Project, ProjectDto>();


            config.NewConfig<Project, ProjectItem>()
                .Map(dest => dest.Id, src => src.Id);
            config.NewConfig<ProjectEditModel, Project>()
                .Ignore(dest => dest.Users);

            config.NewConfig<Process, ProcessDto>();
            config.NewConfig<Process, ProcessItem>()
                .Map(dest => dest.Id, src => src.Id);
            config.NewConfig<ProcessEditModel, Process>();
            config.NewConfig<Role, RoleItem>();
            config.NewConfig<Role, RoleDto>();
            config.NewConfig<Role, RoleEditModel>();
            config.NewConfig<Post, PostItem>()
                .Map(dest => dest.Id, src => src.Id);
            config.NewConfig<Post, PostDto>().MaxDepth(3);
            config.NewConfig<PostEditModel, Post>();


            config.NewConfig<Topic, TopicItem>()
                .Map(dest => dest.Id, src => src.Id);
            config.NewConfig<TopicEditModel, Topic>();


        }
    }
}