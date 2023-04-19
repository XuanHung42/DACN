﻿
using ManageProject.API.Models.Departments;
using ManageProject.API.Models.Project;
using ManageProject.API.Models.Role;
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
            config.NewConfig<Department, DepartmentDto>();
            config.NewConfig<Department, DepartmentItem>()
                .Map(dest => dest.Id , src => src.Id);
            config.NewConfig<DepartmentEditModel, Department>();

            config.NewConfig<Project, ProjectDto>();

            config.NewConfig<Project, ProjectItem>()
                .Map(dest => dest.Id , src => src .Id);
            config.NewConfig<ProjectEditModel, Project>()
                .Ignore(dest => dest.Users);

            

        }
    }
}
