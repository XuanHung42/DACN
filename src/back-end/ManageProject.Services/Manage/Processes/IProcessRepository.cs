using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
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

		// get process by id
		Task<Process> GetProcessByIdAsync(int processId);
		
		// add or update process
		Task<bool> AddOrUpdateProcessAsync(Process process, CancellationToken cancellationToken = default);

		// delete process by id
		Task<bool> DeleteProcessById(int processId, CancellationToken cancellationToken = default);
	}
}
