using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Services.Manage.Departments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Posts
{
	public interface IPostRepository
	{
		Task<IList<T>> GetAllPostAsync<T>(
			Func<IQueryable<Post>, IQueryable<T>> mapper, CancellationToken cancellationToken = default);

		// get post filter
		Task<IPagedList<PostItem>> GetPostPagedFilterAsync(
			IPagingParams pagingParams,
			string title = null,
			string shortDescription = null,
			bool? status = null,
			CancellationToken cancellationToken = default);

		// get details by slug
		Task<Post> GetPostDetailBySlug(string slug, CancellationToken cancellationToken = default);
		Task<bool> IncreaseViewCountAsync(string slug, CancellationToken cancellationToken = default);

		// get n limit view count 
		Task<IList<T>> GetNLimitTopViewCount<T>(int n, Func<IQueryable<Post>,
			IQueryable<T>> mapper, CancellationToken cancellationToken = default);

		Task<IList<T>> GetNLimitByNewId<T>(int n, Func<IQueryable<Post>,
			IQueryable<T>> mapper, CancellationToken cancellationToken = default);

		Task<int> CountTotalPostAsync(CancellationToken cancellationToken = default);
		Task<int> CountPostApprove(CancellationToken cancellationToken = default);
		Task<int> CountPostNotApprove(CancellationToken cancellationToken = default);



		Task<bool> DeletePostAsync(int id, CancellationToken cancellationToken = default);
		Task<bool> CreateOrUpdatePostAsync(Post post, CancellationToken cancellationToken = default);

		Task<bool> IsPostSlugIsExistedAsync(int id, string slug, CancellationToken cancellationToken = default);
		Task<Post> GetPostByIdAsync(int id, CancellationToken cancellationToken = default);

		Task<Post> GetPostById(int postId, CancellationToken cancellationToken = default);

		
	}
}
