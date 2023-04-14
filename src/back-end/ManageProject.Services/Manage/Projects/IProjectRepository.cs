using ManageProject.Core.DTO;
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

	}
}
