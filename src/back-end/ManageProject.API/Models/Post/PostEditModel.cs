namespace ManageProject.API.Models.Post
{
	public class PostEditModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		
		public bool Status { get; set; }
		public DateTime Created { get; set; }
		public IFormFile File { get; set; }
		public int UserId { get; set; }

		public static async ValueTask<PostEditModel> BindAsync(HttpContext context)
		{
			var form = await context.Request.ReadFormAsync();
			return new PostEditModel() { 
				Id = int.Parse(form["Id"]),
				File = form.Files["File"],
				Title = (form["Title"]),
				Created= DateTime.Now,
				UrlSlug= (form["UrlSlug"]),
				Status= (form["Status"]) != "false",
				ShortDescription = (form["ShortDescription"]),
				UserId = int.Parse(form["UserId"])


            };

		}

	}
	
}
