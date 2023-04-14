namespace ManageProject.API.Models.Project
{
	public class ProjectEditModel
	{
		public string Name { get; set; }
		public string Description { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string CostProject { get; set; }
		public int UseNumber { get; set; }
		public bool Register { get; set; }

	}
}
