using ManageProject.API.Models.Users;

namespace ManageProject.API.Models.Departments
{
	public class DepartmentDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string UrlSlug { get; set; }
		public IList<UserDto> Users { get; set; }

	}
}
