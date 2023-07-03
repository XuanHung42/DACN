using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Diagnostics;
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
					CountProject = t.Projects.Count()
				}).ToListAsync(cancellationToken);
			
		}

		public async Task<Topic> GetTopicById(int topicId)
		{
			return await _context.Set<Topic>().FindAsync(topicId);
		}

		public async Task<bool> AddOrUpdateTopicAsync(Topic topic, CancellationToken cancellationToken = default)
		{
			if (topic.Id > 0)
			{
				_context.Topics.Update(topic);
				_memoryCache.Remove($"topic.by-id.{topic.Id}");
			}
			else
			{
				_context.Topics.Add(topic);
			}
			return await _context.SaveChangesAsync(cancellationToken) > 0;
		}

		public async Task<bool> DeleteTopicAsync(int topicId, CancellationToken cancellationToken = default)
		{
			return await _context.Topics.Where(t => t.Id == topicId)
				.ExecuteDeleteAsync(cancellationToken) > 0;
		}

		public async Task<IList<TopicItem>> GetTopicListCombobox(CancellationToken cancellationToken = default)
		{
			IQueryable<Topic> topics = _context.Set<Topic>();
			return await topics.OrderBy(t => t.Id)
				.Select(t => new TopicItem()
				{
					Id = t.Id,
					Name = t.Name,
				}).ToListAsync(cancellationToken);
		}
	}
}
