using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Roles
{
    public interface IRoleRepository
    {

        Task<IList<T>> GetRoleAsync<T>(

            Func<IQueryable<Role>, IQueryable<T>> mapper,
            CancellationToken cancellationToken = default);
        Task<IPagedList<T>> GetPagedProjectAsync<T>(
           RoleQuery query, IPagingParams pagingParams,
           Func<IQueryable<Role>, IQueryable<T>> mapper,
           CancellationToken cancellationToken = default);
        Task<Role> GetCachedRoleByIdAsync(int roleId, bool roleDetail = false, CancellationToken cancellationToken = default);
        Task<Role> GetRoleByIdAsync(int roleId, bool includeDetails = false, CancellationToken cancellationToken = default);
        Task<Role> GetRoleByNameAsync(string name, CancellationToken cancellationToken = default);

        Task<bool> CheckNameExistedAsync(int roleId, string name, CancellationToken cancellationToken = default);
    Task<bool> DeleteRoletByIdAsync(int roleId, CancellationToken cancellationToken = default);

    }
}
