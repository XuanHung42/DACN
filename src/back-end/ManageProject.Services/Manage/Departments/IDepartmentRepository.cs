﻿using ManageProject.Core.DTO;
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
	}
}
