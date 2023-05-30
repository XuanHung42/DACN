using ManageProject.Core.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.Entities
{
    public class User:IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BirthDate { get; set; } = DateTime.Now;
        public string UrlSlug { get; set; }
        public int DepartmentId { get; set; }
        public int RoleId { get; set; }
 
        public Department Department { get; set; }
        public IList<Project> Projects { get; set; }
        public Role Role { get; set; }
        public IList<Post> Posts { get; set; }

		// checkout test branch new
		public string RoleString { get; set; }
		public UserToken UserToken { get; set; }
	}
}
