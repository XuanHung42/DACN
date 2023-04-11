using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Users
{
    public interface IUserRepository
    {
        Task<IList<UserItem>> GetUserAsync(CancellationToken cancellationToken = default);
        Task<IPagedList<UserItem>> GetPagedUserAsync(IPagingParams pagingParams, string name = null, CancellationToken cancellationToken = default);

        Task<User> GetUserBySlugAsync(string slug, CancellationToken cancellationToken = default);
        Task<User> GetUserByIdAsync(int id, CancellationToken cancellationToken = default);
        Task<bool> AddOrUpdateAsync(
       User user, CancellationToken cancellationToken = default);
        Task<User> GetUserByIdIsDetailAsync(int userId, bool isDetail = false, CancellationToken cancellationToken = default);
        Task<bool> DeleteUserAsync(
            int userId, CancellationToken cancellationToken = default);
        Task<bool> IsUserSlugExistedAsync(
            int userId,
            string slug,
            CancellationToken cancellationToken = default);


    }
}
