using ManageProject.Core.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Processes
{
	public interface IProcessRepository
	{
		// get process not required
		Task<IList<ProcessItem>> GetProcessAsync(CancellationToken cancellationToken = default);
	}
}
