using System.ComponentModel;

namespace ManageProject.API.Models.Project
{
	public class ProjectFilterModel :PagingModel
	{
		[DisplayName("Tên")]
		public string Name { get; set; }

		[DisplayName("Người dùng")]
		public int? UserId { get; set; }


	}
}
