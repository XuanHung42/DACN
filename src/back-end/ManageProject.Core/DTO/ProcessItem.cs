using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
	public class ProcessItem
	{
		public int Id { get; set; }
		public string ExcutionTime { get; set; }
		//public int ProjectId { get; set; }
		//public Project Project { get; set; }
		public bool Start { get; set; }
		public bool StartMaking { get; set; }
		public bool WriteReport { get; set; }
		public bool Complete { get; set; }
		public bool Status { get; set; }
	}
}
