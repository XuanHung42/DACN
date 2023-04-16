using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ManageProject.API.Models.Project
{
	public class ProjectEditModel
	{
		public int Id { get; set; }
		[DisplayName("Tên dự án")]
		[Required(ErrorMessage = "Tên dự án được đề trống")]
		[MaxLength(500, ErrorMessage = "Tên dự án đa 100 ký tự")]
		public string Name { get; set; }

		[DisplayName("Nội dung")]
		[Required]
		public string Description { get; set; }

		[DisplayName("Giới thiệu ngắn")]
		[Required]
		public string ShortDescription { get; set; }

		//public string UrlSlug { get; set; }

		[DisplayName("Chi phí")]
		[Required]
		public string CostProject { get; set; }

		[DisplayName("Số người thực hiện")]
		[Required]
		public int UseNumber { get; set; }

		public bool Register { get; set; }

		public string SelectUsers { get; set; }
		public List<string> GetSlectedUser()
		{
			return (SelectUsers ?? "")
				.Split(new[] { ',', ';', '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries)
				.ToList();
		}

		public static async ValueTask<ProjectEditModel> BindAsync(HttpContext context)
		{
			var form = await context.Request.ReadFormAsync();
			return new ProjectEditModel()
			{
				Id = int.Parse(form["Id"]),
				Name = (form["Name"]),
				Description = (form["Description"]),
				ShortDescription = (form["ShortDescription"]),
				CostProject = (form["CostProject"]),
				UseNumber = int.Parse(form["UseNumber"]),
				Register = form["Register"] != "false",

			};
		}

	}
}
