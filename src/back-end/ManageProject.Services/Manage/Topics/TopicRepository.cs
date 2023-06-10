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

namespace ManageProject.Services.Manage.Topics
{
	public class TopicRepository :ITopicRepository
	{
		private readonly ManageDbContext _context;
		private readonly IMemoryCache _memoryCache;

		public TopicRepository(ManageDbContext context, IMemoryCache memoryCache)
		{
			_context = context;
			_memoryCache = memoryCache;
		}

		public async Task<IList<TopicItem>> GetAllTopicAsync(CancellationToken cancellationToken = default)
		{
			IQueryable<Topic> topics = _context.Set<Topic>();
			return await topics.OrderBy(t => t.Name)
				.Select(t => new TopicItem()
				{
					Id = t.Id,
					Name = t.Name,
					UrlSlug = t.UrlSlug,
				}).ToListAsync(cancellationToken);
			
		}
	}
}
