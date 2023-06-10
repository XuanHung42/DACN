using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Topics
{
	public interface ITopicRepository
	{
		// getall
		Task<IList<TopicItem>> GetAllTopicAsync (CancellationToken cancellationToken = default);

		Task<Topic> GetTopicById(int topicId);

		Task<bool> AddOrUpdateTopicAsync(Topic topic, CancellationToken cancellationToken = default);
	}
}
