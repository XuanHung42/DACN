using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Services.Manage.Users
{
    public class UserRepository:IUserRepository
    {
        private readonly ManageDbContext _context;

        public UserRepository(ManageDbContext context)
        {
            _context = context;
        }
         public async Task<IList<UserItem>> GetUserAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>()
                .OrderBy(u => u.Name)
                .Select(u => new UserItem()
                {

                    Name = u.Name,
                    DepartmentId = u.Department.Id,
                    BirthDate = u.BirthDate,
                    Email = u.Email,
                    RoleId = u.Role.Id,
                    UrlSlug = u.UrlSlug,
                    Password = u.Password
                })
                .ToListAsync(cancellationToken);
        }
    }
}
