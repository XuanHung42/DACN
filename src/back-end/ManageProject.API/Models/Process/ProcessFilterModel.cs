using Microsoft.AspNetCore.Mvc.Rendering;

namespace ManageProject.API.Models.Process
{
	public class ProcessFilterModel
	{
		public string Name { get; set; }
		public IEnumerable<SelectListItem> ProcessList { get; set; }

	}
}
