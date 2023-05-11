namespace ManageProject.API.Models.Post
{
	public class PostFilterModel : PagingModel
	{
		public string Title { get; set; }
		public string ShortDescription { get; set; }
		//public string UrlSlug { get; set; }
		//public DateTime Created { get; set; }

	}
}
