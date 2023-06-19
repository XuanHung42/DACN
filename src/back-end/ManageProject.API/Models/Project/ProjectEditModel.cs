using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace ManageProject.API.Models.Project
{
    public class ProjectEditModel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string ShortDescription { get; set; }

        public string UrlSlug { get; set; }


        public string CostProject { get; set; }

        public int UserNumber { get; set; }

        public DateTime StartDate { get; set; }
		public DateTime EndDate { get; set; }

		public bool Register { get; set; }

        public int ProcessId { get; set; }
        public int TopicId { get; set; }
        public string Note { get; set; }
        //public string SelectUsers { get; set; }

        //public List<string> GetSelectedUsers()
        //{
        //	return (SelectUsers ?? "")
        //	  .Split(new[] { ',', ';', '\r', '\n' }, StringSplitOptions.RemoveEmptyEntries)
        //	  .ToList();
        //}

        public static async ValueTask<ProjectEditModel> BindAsync(HttpContext context)
        {
            var form = await context.Request.ReadFormAsync();
            return new ProjectEditModel()
            {
                Id = int.Parse(form["Id"]),
                Name = form["Name"],
                Description = form["Description"],
                ShortDescription = form["ShortDescription"],
                CostProject = (form["CostProject"]),
                UserNumber = int.Parse(form["UserNumber"]),
                Register = form["Register"] != "true",
				StartDate = DateTime.Parse(form["StartDate"]),
				EndDate = DateTime.Parse(form["EndDate"]),
				ProcessId = int.Parse(form["ProcessId"]),
                TopicId = int.Parse(form["TopicId"]),
                Note = form["Note"]
			};
        }

    }
}
