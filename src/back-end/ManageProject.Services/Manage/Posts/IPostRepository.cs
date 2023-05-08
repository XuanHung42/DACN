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
	}
}
