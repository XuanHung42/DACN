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

namespace ManageProject.Services.Manage.Projects
{
	public class ProjectRepository : IProjectRepository
	{
		private readonly ManageDbContext _context;
		private readonly IMemoryCache _memoryCache;

		public ProjectRepository(ManageDbContext context, IMemoryCache memoryCache)
		{
			_context = context;
			_memoryCache = memoryCache;
		}

		public async Task<IList<T>> GetProjectAsync<T>(
			Func<IQueryable<Project>, IQueryable<T>> mapper,
			CancellationToken cancellationToken = default)
		{
			IQueryable<Project> projects = _context.Set<Project>()
					.Include(p => p.Users)
					.OrderBy(pr => pr.Id);
			return await mapper(projects).ToListAsync(cancellationToken);
		}


		public async Task<IPagedList<ProjectItem>> GetPagedProjectsAsync(IPagingParams pagingParams, string name = null, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Project>()
				.AsNoTracking()
				.WhereIf(!string.IsNullOrWhiteSpace(name),
				x => x.Name.Contains(name))
				.Select(pr => new ProjectItem()
				{
					Id = pr.Id,
					Name = pr.Name,
					Description = pr.Description,
					ShortDescription = pr.ShortDescription,
					UrlSlug = pr.UrlSlug,
					CostProject = pr.CostProject,
					UserNumber = pr.UserNumber,
					Register = pr.Register
				}).ToPagedListAsync(pagingParams, cancellationToken);
		}

		public async Task<Project> GetProjectByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Project>().FindAsync(id);
		}
	}
}
