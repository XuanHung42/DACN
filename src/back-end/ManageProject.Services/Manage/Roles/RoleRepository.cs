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

namespace ManageProject.Services.Manage.Roles
{
    public class RoleRepository:IRoleRepository
    {
        private readonly ManageDbContext _context;
        private readonly IMemoryCache _memoryCache;

        public RoleRepository(ManageDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }
        public async Task<IList<T>> GetRoleAsync<T>(
            
            Func<IQueryable<Role> , IQueryable<T>> mapper,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Role> role = _context.Set<Role>()
                .Include(r=> r.Users)
                .OrderBy(r=> r.Id);
            return await mapper(role).ToListAsync(cancellationToken);
        }
        public async Task<IPagedList<T>> GetPagedProjectAsync<T>(
           RoleQuery query, IPagingParams pagingParams, 
           Func<IQueryable<Role>, IQueryable<T>> mapper,
           CancellationToken cancellationToken = default)
        {
            IQueryable<Role> roleFindQuery =FilterRole(query);
            IQueryable<T> queryResult = mapper(roleFindQuery);
            return await queryResult.ToPagedListAsync(pagingParams, cancellationToken);
        }

        private IQueryable<Role> FilterRole(RoleQuery query)
        {
            IQueryable<Role> roleQuery = _context.Set<Role>()
                .Include(r => r.Users);
            if (!string.IsNullOrWhiteSpace(query.Name))
            {
                roleQuery = roleQuery.Where(r => r.Name == query.Name);
            }
            if (!string.IsNullOrWhiteSpace(query.UserSlug))
            {
                roleQuery = roleQuery.Where(r => r.Users.Any(r => r.UrlSlug == query.UserSlug));

            }
            
            return roleQuery;
        }

        public async Task<Role> GetCachedRoleByIdAsync(int roleId, bool roleDetail= false, CancellationToken cancellationToken= default)
        {

            return await _memoryCache.GetOrCreateAsync($"role.by-id.{roleId}",
                async (entry) =>
                {
                    entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(30);
                    return await GetRoleByIdAsync(roleId, roleDetail);
                });
        }
        public async Task<Role> GetRoleByIdAsync(int roleId, bool includeDetails = false, CancellationToken cancellationToken = default)
        {
            if (!includeDetails)
            {
                return await _context.Set<Role>().FindAsync(roleId);
            }
            return await _context.Set<Role>()
                .Include(x => x.Users)
               
                .FirstOrDefaultAsync(x => x.Id == roleId, cancellationToken);

        }
        public async Task<Role> GetRoleByNameAsync(string name, CancellationToken cancellationToken = default)
        {
            IQueryable<Role> roleQuery = _context.Set<Role>()
                .Include(pr => pr.Users);
             

            if (!string.IsNullOrEmpty(name))
            {
                roleQuery = roleQuery.Where(r=> r.Name == name);
            }
            return await roleQuery.FirstOrDefaultAsync(cancellationToken);

        }
        public async Task<bool> CheckNameExistedAsync(int roleId, string name, CancellationToken cancellationToken = default)
        {
            return await _context.Set<Role>()
                .AnyAsync(x => x.Id != roleId && x.Name == name, cancellationToken);
        }
        public async Task<bool> DeleteRoletByIdAsync(int roleId, CancellationToken cancellationToken = default)
        {
            return await _context.Roles
                .Where(p => p.Id == roleId)
                .ExecuteDeleteAsync(cancellationToken) > 0;
        }

		public async Task<IList<RoleItem>> GetRoleNotRequired(CancellationToken cancellationToken = default)
		{
            IQueryable<Role> user = _context.Set<Role>();
            return await user.OrderBy(u => u.Name).Select(u => new RoleItem()
            {
                Id = u.Id,
                Name = u.Name,

            }).ToListAsync(cancellationToken);
		}
	}
}
