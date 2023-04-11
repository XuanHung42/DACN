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
    }
}
