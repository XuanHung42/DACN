using Microsoft.AspNetCore.Mvc.Rendering;

namespace ManageProject.API.Models.Departments
{
	public class DepartmentFilterModel : PagingModel
	{
		public string Name { get; set; }
	}
}
