using ManageProject.API.Models.Post;
using ManageProject.API.Models.Users;

namespace ManageProject.API.Models.Department
{
	public class DepartmentDetail
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string UrlSlug { get; set; }
		public IList<UserDto> Users { get; set; }
		public IList<PostDto> Posts { get; set; }

	}
}
