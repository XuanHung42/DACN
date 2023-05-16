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
			string title = null, CancellationToken cancellationToken = default);
	
		// get details by slug
		Task<Post> GetPostDetailBySlug(string slug, CancellationToken cancellationToken = default);
		Task IncreaseViewCountAsync(int postId, CancellationToken cancellationToken);

    }
}
