using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Departments
{
	public interface IDepartmentRepository
	{
		// get department not paging
		Task<IList<DepartmentItem>> GetDepartmentAsync(
			CancellationToken cancellationToken = default);

		// get department include paging
		Task<IPagedList<DepartmentItem>> GetPagedDepartmentAsync(
			IPagingParams pagingParams, 
			string name = null, 
			CancellationToken cancellationToken = default);

		// get by id
		Task<Department> GetDepartmentByIdAsync(int id, CancellationToken cancellationToken = default);


		Task<IPagedList<T>> GetPagedUserAsync<T>(
			UserQuery query, IPagingParams pagingParams, Func<IQueryable<User>, IQueryable<T>> mapper,
			CancellationToken cancellationToken = default
			);

		Task<IPagedList<T>> GetPagedPostAsync<T>(
			PostQuery query, IPagingParams pagingParams, Func<IQueryable<Post>, IQueryable<T>> mapper,
			CancellationToken cancellationToken = default
			);
	}
}
