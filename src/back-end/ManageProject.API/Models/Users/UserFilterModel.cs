using Microsoft.AspNetCore.Mvc.Rendering;
using System.Globalization;

namespace ManageProject.API.Models.Users
{
    public class UserFilterModel:PagingModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public IEnumerable<SelectListItem> RoleList { get; set; }
		public IEnumerable<SelectListItem> DepartmentList { get; set; }

	}
}
