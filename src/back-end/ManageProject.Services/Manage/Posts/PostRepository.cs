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
					//File = p.File,
					//User = p.User,
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

	}
}

//public string ShortDescription { get; set; }
//public string UrlSlug { get; set; }
//public string File { get; set; }
//public int UserId { get; set; }
//public bool Status { get; set; }
//public User User { get; set; }