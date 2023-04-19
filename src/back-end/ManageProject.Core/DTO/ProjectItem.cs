using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
	public class ProjectItem
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Description { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string CostProject { get; set; }
		public int UserNumber { get; set; }
		public bool Register { get; set; }
		public IList<User> Users { get; set; }

	}
}
