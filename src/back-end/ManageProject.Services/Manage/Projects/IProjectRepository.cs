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
		Task<IList<ProjectItem>> GetProjectAsync(CancellationToken cancellationToken = default);

		// get include paging
		Task<IPagedList<ProjectItem>> GetPagedProjectsAsync(
			IPagingParams pagingParams,
			string name = null,
			CancellationToken cancellationToken = default);

		// get project by id
		Task<Project> GetProjectByIdAsync (int id, CancellationToken cancellationToken = default);

	}
}
