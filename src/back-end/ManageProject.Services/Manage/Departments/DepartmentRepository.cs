using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
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
		public async Task<IList<DepartmentItem>> GetDepartmentAsync(CancellationToken cancellationToken = default)
		{
			IQueryable<Department> departments = _context.Set<Department>();
			return await departments.OrderBy(d => d.Name).Select(d => new DepartmentItem()
			{
				Id = d.Id,
				Name = d.Name,
				UrlSlug = d.UrlSlug
			}).ToListAsync(cancellationToken);
		}

		// code
	}
}
