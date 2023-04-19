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
		public string UrlSlug { get; set; } = "";
		public int? UserId { get; set; }
		public string UserSlug { get; set; } = "";

	}

}
