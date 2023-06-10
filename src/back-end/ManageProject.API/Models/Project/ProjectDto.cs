using ManageProject.API.Models.Process;
using ManageProject.API.Models.Topic;
using ManageProject.API.Models.Users;
using ManageProject.Core.Entities;

namespace ManageProject.API.Models.Project
{
	public class ProjectDto
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string CostProject { get; set; }
		public int UserNumber { get; set; }
		public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }
		public string Note { get; set; }
		public bool Register { get; set; }
		public int ProcessId { get; set; }
		public int TopicId { get; set; }
		public IList<UserDto> Users { get; set; }
		public ProcessDto Process{ get; set; }
		public TopicDto Topic { get; set; }

	}
}
