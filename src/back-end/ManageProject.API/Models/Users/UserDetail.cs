using ManageProject.Core.Entities;
using ManageProject.API.Models.Project;
using ManageProject.API.Models.Post;

namespace ManageProject.API.Models.Users
{
    public class UserDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        //public string Password { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BirthDate { get; set; }
        public string UrlSlug { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }

        //public Department Department { get; set; }
        public IList<ProjectDto> Projects { get; set; }

        public IList<PostDto> Posts { get; set; }
    }
}
