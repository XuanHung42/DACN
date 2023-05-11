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
			return await progresses.OrderBy(p => p.StartMaking)
				.Select(p => new ProcessItem()
				{
					Id = p.Id,
					ExcutionTime = p.ExcutionTime,
					Start = p.Start,
					StartMaking = p.StartMaking,
					WriteReport= p.WriteReport,
					Complete= p.Complete,
					Status= p.Status
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

	}
}
