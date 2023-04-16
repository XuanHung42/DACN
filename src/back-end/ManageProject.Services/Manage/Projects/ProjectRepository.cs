﻿using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using ManageProject.Services.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking.Internal;
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
				projectQuery = projectQuery.Where(u => u.UrlSlug == query.UrlSlug);
			}

			if (query.UserId > 0)
			{
				projectQuery = projectQuery.Where(u => u.UserId == query.UserId);
			}

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




		// get project by id

	}
}
