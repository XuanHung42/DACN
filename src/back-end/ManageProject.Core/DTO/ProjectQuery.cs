using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{


	public class ProjectQuery
	{
		public string Name { get; set; } = "";
		public string UserSlug { get; set; } = "";
		public int? UserId { get; set; }
		public int? DepartmentId { get; set; }
		public int? MonthStart { get; set; }
		public int? MonthEnd { get; set; }
		public int? YearStart { get; set; }
		public int? YearEnd { get; set; }
		public int? ProcessId { get; set; }

	}

}
