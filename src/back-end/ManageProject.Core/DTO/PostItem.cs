using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
	public class PostItem
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string File { get; set; }
		public DateTime Created { get; set; }
		public int UserId { get; set; }
		public int DepartmentId { get; set; }
		public bool Status { get; set; }
		public User User { get; set; }

		public Department Department { get; set; }
        public int ViewCount { get; set; }

	}
}
