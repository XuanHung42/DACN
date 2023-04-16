namespace ManageProject.API.Models.Process
{
	public class ProcessDto
	{
		public int Id { get; set; }
		public string ExcutionTime { get; set; }
		//public int ProjectId { get; set; }
		public bool Start { get; set; }
		public bool StartMaking { get; set; }
		public bool WriteReport { get; set; }
		public bool Complete { get; set; }
		public bool Status { get; set; }
	}
}
