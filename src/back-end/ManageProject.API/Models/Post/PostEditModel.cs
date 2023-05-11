namespace ManageProject.API.Models.Post
{
	public class PostEditModel
	{
		public int Id { get; set; }
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		public string UrlSlug { get; set; }
		public string File { get; set; }
		public bool Status { get; set; }
		public DateTime Created { get; set; }
	}
}
