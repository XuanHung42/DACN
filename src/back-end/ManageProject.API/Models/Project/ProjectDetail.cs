using ManageProject.API.Models.Users;

namespace ManageProject.API.Models.Project
{
	public class ProjectDetail
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string CostProject { get; set; }
		public int UserNumber { get; set; }
		public bool Register { get; set; }
		public int ProcessId { get; set; }
	}
}
