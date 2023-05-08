using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
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
	}
}
