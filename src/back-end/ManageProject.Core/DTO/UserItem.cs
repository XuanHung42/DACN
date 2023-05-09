using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
    public class UserItem
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ImageUrl { get; set; }
        public DateTime BirthDate { get; set; }
        public string UrlSlug { get; set; }
        public int DepartmentId { get; set; }
        //public int RoleId { get; set; }
        //public IList<Project> Projects { get; set; } 
    }
}
