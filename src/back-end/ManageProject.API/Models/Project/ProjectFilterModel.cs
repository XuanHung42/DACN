using Microsoft.AspNetCore.Mvc.Rendering;
using System.ComponentModel;
using System.Globalization;

namespace ManageProject.API.Models.Project
{
	public class ProjectFilterModel :PagingModel
	{
		public string Name { get; set; }
		public int? UserId { get; set; }
		public string UserSlug { get; set; }
		public int? ProcessId { get; set; }
		public int? MonthPerform { get; set; }
		public int? YearPerform { get; set; }

		public IEnumerable<SelectListItem> ProcessList { get; set; }
		public IEnumerable<SelectListItem> MonthList { get; set; }
		public ProjectFilterModel()
		{
			CultureInfo.CurrentCulture = new CultureInfo("vi-VN");
			MonthList = Enumerable.Range(1, 12)
				.Select(m => new SelectListItem()
				{
					Value = m.ToString(),
					Text = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(m)
				}).ToList();
		}

	}
}
