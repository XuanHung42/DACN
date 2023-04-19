using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using ManageProject.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
using Microsoft.Extensions.Caching.Memory;
using SlugGenerator;

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
		//// cach lay ra het thuoc tinh cua user
		//public async Task<IList<ProjectItem>> GetProjectAsync(CancellationToken cancellationToken = default)
		//{
		//	return await _context.Set<Project>()
		//		.Include(p => p.Users)
		//		.OrderBy(pr => pr.Id)
		//		.Select(pr => new ProjectItem()
		//		{
		//			Id = pr.Id,
		//			Name = pr.Name,
		//			Description = pr.Description,
		//			ShortDescription = pr.ShortDescription,
		//			UrlSlug = pr.UrlSlug,
		//			CostProject = pr.CostProject,
		//			UserNumber = pr.UserNumber,
		//			Register = pr.Register,
		//			Users = pr.Users
		//		}).ToListAsync(cancellationToken);
		//}


		/// <summary>
		/// Get not required
		/// </summary>
		/// <typeparam name="T"></typeparam>
		/// <param name="mapper"></param>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public async Task<IList<T>> GetProjectAsync<T>(
			Func<IQueryable<Project>, IQueryable<T>> mapper,
			CancellationToken cancellationToken = default)
		{
			IQueryable<Project> projects = _context.Set<Project>()
					.Include(p => p.Users)
					.Include(p => p.Processes)
					.OrderBy(pr => pr.Id);
			return await mapper(projects).ToListAsync(cancellationToken);
		}

		// get include paging
		public async Task<IPagedList<T>> GetPagedProjectAsync<T>(ProjectQuery query, IPagingParams pagingParams, Func<IQueryable<Project>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			IQueryable<Project> projectFindQuery = FilterProject(query);
			IQueryable<T> queryResult = mapper(projectFindQuery);
			return await queryResult.ToPagedListAsync(pagingParams, cancellationToken);
		}

		// filter project
		private IQueryable<Project> FilterProject(ProjectQuery query)
		{
			IQueryable<Project> projectQuery = _context.Set<Project>()
				.Include(pr => pr.Users)
				.Include(pr => pr.Processes)
				.Include(pr => pr.Posts);
			if (!string.IsNullOrEmpty(query.Name))
			{
				projectQuery = projectQuery.Where(pr => pr.Name.Contains(query.Name)
				|| pr.ShortDescription.Contains(query.Name)
				|| pr.UrlSlug.Contains(query.Name)
				|| pr.Description.Contains(query.Name)
				);
			}

			if (!string.IsNullOrWhiteSpace(query.UserSlug))
			{
				projectQuery = projectQuery.Where(pr => pr.Users.Any(u => u.UrlSlug == query.UserSlug));
			}

			if (query.UserId > 0)
			{
				projectQuery = projectQuery.Where(pr => pr.Users.Any(u => u.Id == query.UserId));
			}
			//if (query.UserId > 0)
			//{
			//	projectQuery = projectQuery.Include(pr => pr.Users)
			//		.Where(u => u.Users.Any(u => u.Id == query.UserId));
			//}

			return projectQuery;

		}

		public async Task<Project> GetCachedProjectByIdAsync(int projectId, bool projectDetai = false, CancellationToken cancellationToken = default)
		{
			return await _memoryCache.GetOrCreateAsync($"projects.by-id.{projectId}",
				async (entry) =>
				{
					entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
					return await GetProjectByIdAsync(projectId, projectDetai);
				});
		}

		public async Task<Project> GetProjectByIdAsync(int projectId, bool includeDetails = false, CancellationToken cancellationToken = default)
		{
			if (!includeDetails)
			{
				return await _context.Set<Project>().FindAsync(projectId);
			}
			return await _context.Set<Project>()
				.Include(x => x.Users)
				.Include(x => x.Processes)
				.FirstOrDefaultAsync(x => x.Id == projectId, cancellationToken);

		}

		public async Task<Project> GetProjectBySlugAsync(string slug, CancellationToken cancellationToken = default)
		{
			IQueryable<Project> projectQuery = _context.Set<Project>()
				.Include(pr => pr.Users)
				.Include(pr => pr.Processes);

			if (!string.IsNullOrEmpty(slug))
			{
				projectQuery = projectQuery.Where(pr => pr.UrlSlug == slug);
			}
			return await projectQuery.FirstOrDefaultAsync(cancellationToken);

		}

		// kiem tra slug da ton tai hay chua
		public async Task<bool> CheckSlugExistedAsync(int projectId, string slug, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Project>()
				.AnyAsync(x => x.Id != projectId && x.UrlSlug == slug, cancellationToken);
		}


		public async Task<bool> CreateOrUpdateProjectAsync(Project project, IEnumerable<string> user, CancellationToken cancellationToken = default)
		{
			if (project.Id > 0)
			{
				await _context.Entry(project).Collection(x => x.Users).LoadAsync(cancellationToken);
			}
			else
			{
				project.Users = new List<User>();
			}

			var validUser = user.Where(x => !string.IsNullOrEmpty(x))
				.Select(x => new
				{
					Name = x,
					Slug = x.GenerateSlug(),
				})
				.GroupBy(x => x.Slug)
				.ToDictionary(g => g.Key, g => g.First().Name);

			foreach (var kv in validUser)
			{
				if (project.Users.Any(x => string.Compare(x.UrlSlug, kv.Key, StringComparison.InvariantCultureIgnoreCase) == 0)) continue;

				var users = await GetUserSlugAsync(kv.Key, cancellationToken) ?? new User()
				{
					Name = kv.Value,
					Email = kv.Value,
					UrlSlug = kv.Key,
				};

				project.Users.Add(users);
			}

			project.Users = project.Users.Where(u => validUser.ContainsKey(u.UrlSlug)).ToList();

			if (project.Id > 0)
			{
				_context.Update(project);
			}
			else
			{
				_context.Add(project);
			}
			return await _context.SaveChangesAsync(cancellationToken) > 0;
		}

		public async Task<User> GetUserSlugAsync(string slug, CancellationToken cancellationToken = default)
		{
			IQueryable<User> userQuery = _context.Set<User>()
				.Where(p => p.UrlSlug == slug);

			return await userQuery.FirstOrDefaultAsync(cancellationToken);
		}

		public async Task<bool> DeleteProjectByIdAsync(int projectId, CancellationToken cancellationToken = default)
		{
			return await _context.Projects
				.Where(p => p.Id == projectId)
				.ExecuteDeleteAsync(cancellationToken) > 0;
		}
	}
}
