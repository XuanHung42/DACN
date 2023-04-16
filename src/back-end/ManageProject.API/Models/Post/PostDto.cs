using ManageProject.API.Models.Departments;
using ManageProject.API.Models.Project;
using ManageProject.API.Models.Users;

namespace ManageProject.API.Models.Post
{
	public class PostDto
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string File { get; set; }
		public bool Status { get; set; }
		public DateTime Created { get; set; }
		public DepartmentDto Department { get; set; }
		public UserDto User { get; set; }


	}
}
