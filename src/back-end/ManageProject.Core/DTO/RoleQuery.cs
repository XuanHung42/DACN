using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Core.DTO
{
    public class RoleQuery
    {
        public string UserSlug { get; set; } = "";
        public int UserId { get; set; }
        public string Name { get; set; }
      
    }
}
