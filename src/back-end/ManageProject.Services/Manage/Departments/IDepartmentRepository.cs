﻿using ManageProject.Core.Contracts;
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



	}
}
