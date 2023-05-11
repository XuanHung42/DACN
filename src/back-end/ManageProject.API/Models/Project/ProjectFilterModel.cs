using System.ComponentModel;

namespace ManageProject.API.Models.Project
{
	public class ProjectFilterModel :PagingModel
	{
		public string Name { get; set; }
		//public int? UserId { get; set; }
		//public string UserSlug { get; set; }

	}
}
