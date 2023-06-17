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

namespace ManageProject.Services.Manage.Processes
{
	public class ProcessRepository : IProcessRepository
	{
		private readonly ManageDbContext _context;
		private readonly IMemoryCache _memoryCache;

		public ProcessRepository(ManageDbContext context, IMemoryCache memoryCache)
		{
			_context = context;
			_memoryCache = memoryCache;
		}

		public async Task<IList<ProcessItem>> GetProcessAsync(CancellationToken cancellationToken = default)
		{
			IQueryable<Process> progresses = _context.Set<Process>();
			return await progresses.OrderBy(p => p.Name)
				.Select(p => new ProcessItem()
				{
					Id = p.Id,
					Name = p.Name,
					UrlSlug = p.UrlSlug,
					CountProject = p.Projects.Count(),
					
				}).ToListAsync(cancellationToken);
		}

		public async Task<Process> GetProcessByIdAsync(int processId)
		{
			return await _context.Set<Process>().FindAsync(processId);
		}

		public async Task<bool> AddOrUpdateProcessAsync(Process process, CancellationToken cancellationToken = default)
		{
			if (process.Id > 0)
			{
				_context.Processs.Update(process);
				_memoryCache.Remove($"process.by-id.{process.Id}");
			}
			else
			{
				_context.Processs.Add(process);
			}
			return await _context.SaveChangesAsync(cancellationToken) > 0;
		}

		// delete process by id
		public async Task<bool> DeleteProcessById(int processId, CancellationToken cancellationToken = default)
		{
			return await _context.Processs.Where(pr => pr.Id == processId)
				.ExecuteDeleteAsync(cancellationToken) > 0;
		}

		public async Task<IList<ProcessItem>> GetProcessListCombobox(CancellationToken cancellationToken = default)
		{
			IQueryable<Process> processes = _context.Set<Process>();
			return await processes.OrderBy(pc => pc.Name)
				.Select(pc => new ProcessItem()
				{
					Id = pc.Id,
					Name = pc.Name,
				}).ToListAsync(cancellationToken);
		}
	}
}
