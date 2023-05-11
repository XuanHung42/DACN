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

namespace ManageProject.Services.Manage.Departments
{
	public class DepartmentRepository : IDepartmentRepository
	{
		private readonly ManageDbContext _context;
		private readonly IMemoryCache _memoryCache;

		public DepartmentRepository(ManageDbContext context, IMemoryCache memoryCache)
		{
			_context = context;
			_memoryCache = memoryCache;
		}

		// get department not paging
		//public async Task<IList<DepartmentItem>> GetDepartmentAsync(CancellationToken cancellationToken = default)
		//{
		//	IQueryable<Department> departments = _context.Set<Department>();
		//	return await departments.OrderBy(d => d.Name).Select(d => new DepartmentItem()
		//	{
		//		Id = d.Id,
		//		Name = d.Name,
		//		UrlSlug = d.UrlSlug
		//	}).ToListAsync(cancellationToken);
		//}


		public async Task<IList<T>> GetAllDepartmentAsync<T>(Func<IQueryable<Department>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			IQueryable<Department> departments = _context.Set<Department>()
				.Include(u => u.Users)
				.Include(p => p.Posts)
				.OrderBy(d => d.Name);
			return await mapper(departments).ToListAsync(cancellationToken);
		}

		// get department required paging
		public async Task<IPagedList<DepartmentItem>> GetPagedDepartmentAsync(IPagingParams pagingParams, string name = null, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Department>()
				.AsNoTracking()
				.WhereIf(!string.IsNullOrWhiteSpace(name),
				x => x.Name.Contains(name))
				.Select(d => new DepartmentItem()
				{
					Id = d.Id,
					Name = d.Name,
					UrlSlug = d.UrlSlug
				}).ToPagedListAsync(pagingParams, cancellationToken);
		}

		public async Task<Department> GetDepartmentByIdAsync(int id, CancellationToken cancellationToken = default)
		{
			return await _context.Set<Department>().FindAsync(id);
		}

		public async Task<IPagedList<T>> GetPagedUserAsync<T>(UserQuery query, IPagingParams pagingParams, Func<IQueryable<User>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			IQueryable<User> userFindQuery = FilterUser(query);
			IQueryable<T> queryResult = mapper(userFindQuery);
			return await queryResult.ToPagedListAsync(pagingParams, cancellationToken);
		}

		private IQueryable<User> FilterUser(UserQuery query)
		{
			IQueryable<User> userQuery = _context.Set<User>()
				.Include(u => u.Department)
				.Include(u => u.Posts)
				.Include(u => u.Projects);

			if (!string.IsNullOrEmpty(query.Keyword))
			{
				userQuery = userQuery.Where(u => u.Name.Contains(query.Keyword)
				|| u.Email.Contains(query.Keyword)
				|| u.UrlSlug.Contains(query.Keyword)
				|| u.Projects.Any(p => p.Name.Contains(query.Keyword))
				);
			}

			if (!string.IsNullOrWhiteSpace(query.DepartmentSlug))
			{
				userQuery = userQuery.Where(u => u.Department.UrlSlug == query.DepartmentSlug);
			}

			return userQuery;


		}

		public async Task<IPagedList<T>> GetPagedPostAsync<T>(PostQuery query, IPagingParams pagingParams, Func<IQueryable<Post>, IQueryable<T>> mapper, CancellationToken cancellationToken = default)
		{
			IQueryable<Post> postFindQuery = FilterPost(query);
			IQueryable<T> queryResut = mapper(postFindQuery);
			return await queryResut.ToPagedListAsync(pagingParams, cancellationToken); 
		}

		private IQueryable<Post> FilterPost(PostQuery query)
		{
			IQueryable<Post> postQuery = _context.Set<Post>()
				.Include(p => p.Department)
				.Include(p => p.Projects)
				.Include(p => p.User);

			if (!string.IsNullOrEmpty(query.Keyword))
			{
				postQuery = postQuery.Where(
				   p => p.Title.Contains(query.Keyword)
				|| p.UrlSlug.Contains(query.Keyword)
				|| p.ShortDescription.Contains(query.Keyword)
				|| p.Projects.Any(p => p.Name.Contains(query.Keyword)));
			}

			if (!string.IsNullOrWhiteSpace(query.DepartmentSlug))
			{
				postQuery = postQuery.Where(p => p.Department.UrlSlug == query.DepartmentSlug);
			}
			return postQuery;
		}

		public async Task<bool> AddOrUpdateDepartment(Department department, CancellationToken cancellationToken = default)
		{
			if (department.Id > 0)
			{
				_context.Departments.Update(department);
				_memoryCache.Remove($"department.by-id.{department.Id}");
			}
			else
			{
				_context.Departments.Add(department);
				// check error
			}

			return await _context.SaveChangesAsync(cancellationToken) > 0;
		}

		public async Task<bool> IsDepartmentSlugExistedAsync(int departmentId, string slug, CancellationToken cancellationToken = default)
		{
			return await _context.Departments.AnyAsync(x => x.Id != departmentId && x.UrlSlug == slug, cancellationToken);
		}

		public async Task<bool> DeleteDepartmentByIdAsync(int departmentId, CancellationToken cancellationToken = default)
		{
			return await _context.Departments
				.Where(d => d.Id == departmentId)
				.ExecuteDeleteAsync(cancellationToken) > 0;
		}

		public async Task<Department> GetDetailDepartmentBySlug(string slug, CancellationToken cancellationToken = default)
		{
			IQueryable<Department> departmentsQuery = _context.Set<Department>()
				.Include(u => u.Users)
				.Include(p => p.Posts);
			{
				if (!string.IsNullOrEmpty(slug))
				{
					departmentsQuery = departmentsQuery.Where(dp => dp.UrlSlug == slug);
				}
				return await departmentsQuery.FirstOrDefaultAsync(cancellationToken);
			}

		}
	}
}
