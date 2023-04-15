using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Projects
{
	public interface IProjectRepository
	{
		// write code
		Task<IList<T>> GetProjectAsync<T>(
			Func<IQueryable<Project>, IQueryable<T>> mapper,
			CancellationToken cancellationToken = default);

		// get include paging
		Task<IPagedList<T>> GetPagedProjectAsync<T>(
			ProjectQuery query,
			IPagingParams pagingParams,
			Func<IQueryable<Project>, 
			IQueryable<T>> mapper,
			CancellationToken cancellationToken = default);
	}
}
