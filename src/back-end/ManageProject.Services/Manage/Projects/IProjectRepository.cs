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

        // get by id
        Task<Project> GetCachedProjectByIdAsync(int projectId, bool projectDetai = false, CancellationToken cancellationToken = default);

        // get project
        public Task<Project> GetProjectByIdAsync(
            int projectId, bool includeDetails = false,
            CancellationToken cancellationToken = default);


		// get project by slug
		Task<Project> GetProjectBySlugAsync(string slug, CancellationToken cancellationToken = default);


		//// check slug existed: kiem tra slug da ton tai hay chua
		Task<bool> CheckSlugExistedAsync(int projectId, string slug, CancellationToken cancellationToken = default);

		//// create or update project
		//public Task<bool> CreateOrUpdateProjectAsync(
		//	Project project, IEnumerable<string> user, CancellationToken cancellationToken = default);

		Task<User> GetUserSlugAsync(string slug, CancellationToken cancellationToken = default);

		Task<bool> CreateOrUpdateProjectAsync(
			Project project, CancellationToken cancellationToken = default);

		
		// delete project by id
		Task<bool> DeleteProjectByIdAsync(int projectId, CancellationToken cancellationToken = default);

        Task<int> CountTotalProjectAsync(CancellationToken cancellationToken = default);
        Task<bool> AddUserToProjectAsync(List<int> userId, int projectId, CancellationToken cancellationToken = default);



    }
}
