using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using ManageProject.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Posts
{
	public class PostRepository : IPostRepository
	{
		private readonly ManageDbContext _context;
		private readonly IMemoryCache _memoryCache;
		public PostRepository(ManageDbContext context, IMemoryCache memoryCache)
		{
			_context = context;
			_memoryCache = memoryCache;
		}
		//// get all
		//public async Task<IList<PostItem>> GetAllPostAsync(CancellationToken cancellationToken = default)
		//{
		//	IQueryable<Post> departments = _context.Set<Post>();
		//	return await departments.OrderBy(p => p.Title).Select(p => new PostItem()
		//	{
		//		Id = p.Id,
		//		Title = p.Title,
		//		ShortDescription = p.ShortDescription,
		//		UrlSlug = p.UrlSlug,
		//		File = p.File,
		//		UserId = p.UserId,
		//		Status = p.Status,
		//		//Department = p.Department,
		//		User = p.User,
		//	}).ToListAsync(cancellationToken);
		//}

		public async Task<IList<T>> GetAllPostAsync<T>(Func<IQueryable<Post>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			IQueryable<Post> post = _context.Set<Post>().OrderBy(p => p.Id);

			return await mapper(post).ToListAsync(cancellationToken);
		}
		public async Task<IPagedList<PostItem>> GetPostPagedFilterAsync(IPagingParams pagingParams, string title = null, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Post>()
				.Include(p => p.User)
				.Include(p => p.Department)
				.AsNoTracking()
				.WhereIf(!string.IsNullOrWhiteSpace(title),
				x => x.Title.Contains(title))
				.Select(p => new PostItem()
				{
					Id = p.Id,
					Title = p.Title,
					UrlSlug = p.UrlSlug,
					ShortDescription = p.ShortDescription,
					User = p.User,
					Created = p.Created,
					ViewCount= p.ViewCount,
					//File = p.File,
					//Department = p.Department,

				}).ToPagedListAsync(pagingParams, cancellationToken);
		}
		public async Task<Post> GetPostDetailBySlug(string slug, CancellationToken cancellationToken = default)
		{
			IQueryable<Post> postQuery = _context.Set<Post>()
				.Include(p => p.User)
				.Include(p => p.Department);
			{
				if (!string.IsNullOrEmpty(slug))
				{
					postQuery = postQuery.Where(p => p.UrlSlug == slug);
				}
				return await postQuery.FirstOrDefaultAsync(cancellationToken);
			}
		}
        public async Task IncreaseViewCountAsync(int postId, CancellationToken cancellationToken)
        {

            await _context.Set<Post>()
                    .Where(x => x.Id == postId)
                    .ExecuteUpdateAsync(p =>
                    p.SetProperty(p => p.ViewCount, x => x.ViewCount + 1), cancellationToken);
        }

		public async Task<IList<T>> GetNLimitTopViewCount<T>(int n, Func<IQueryable<Post>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			var topViewCount = _context.Set<Post>()
				.Include(p => p.User)
				.OrderByDescending(p => p.ViewCount)
				.Take(n);

			return await mapper(topViewCount).ToListAsync(cancellationToken);
		}

		public async Task<IList<T>> GetNLimitByNewId<T>(int n, Func<IQueryable<Post>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			var byNewId = _context.Set<Post>()
				.Include(p => p.User)
				.OrderByDescending(p => p.Id)
				.Take(n);
			return await mapper(byNewId).ToListAsync(cancellationToken);
		}

		public async Task<int> CountTotalPostAsync(CancellationToken cancellationToken = default)
		{
			return await _context.Set<Post>().CountAsync(cancellationToken);
		}
		public async Task<bool> DeletePostAsync(int id, CancellationToken cancellationToken = default)
		{
			return await _context.Posts.Where(p => p.Id == id).ExecuteDeleteAsync(cancellationToken) > 0;
		}

		public async Task<bool> CreateOrUpdatePostAsync(Post post, CancellationToken cancellationToken = default)
		{
			if(post != null)
			{
				_context.Update(post);
			}
			else
			{
				_context.Add(post);
			}
			return await _context.SaveChangesAsync(cancellationToken) >0;
		}
		public async Task<bool> IsPostSlugIsExistedAsync(int id, string slug, CancellationToken cancellationToken= default)
		{
			return await _context.Posts.AnyAsync(x => x.Id != id && x.UrlSlug == slug, cancellationToken);
		}
		public async Task<Post> GetPostByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Post>().FindAsync(id);
		}


		public async Task<Post> GetPostById(int postId, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Post>().FindAsync(postId);
		}

	

	}
}
