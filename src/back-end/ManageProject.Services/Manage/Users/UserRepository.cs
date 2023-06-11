using ManageProject.Core.Contracts;
using ManageProject.Core.DTO;
using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using ManageProject.Services.Extensions;

using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography.X509Certificates;
using SlugGenerator;
using ManageProject.Data.Extensions;
using ManageProject.Services.Manage.Processes;
using ManageProject.Services.Manage.Projects;

namespace ManageProject.Services.Manage.Users
{
    public class UserRepository : IUserRepository
    {
        private readonly ManageDbContext _context;
        private readonly IMemoryCache _memoryCache;
        private IProjectRepository projectRepository;

        public UserRepository(ManageDbContext context, IMemoryCache memoryCache)
        {
            _context = context;
            _memoryCache = memoryCache;
        }

        public async Task<IList<UserItem>> GetUserAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>()
                .OrderBy(u => u.Name)
                .Select(u => new UserItem()
                {
                    Id = u.Id,

                    Name = u.Name,
                    DepartmentId = u.Department.Id,
                    BirthDate = u.BirthDate,
                    Email = u.Email,
                    RoleId = u.Role.Id,
                    UrlSlug = u.UrlSlug,
                    Password = u.Password,
					//Projects = u.Projects
					DepartmentName = u.Department.Name


				})
                .ToListAsync(cancellationToken);
        }
        public async Task<IPagedList<UserItem>> GetPagedUserAsync(IPagingParams pagingParams, string name = null, string email = null, CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>()
                    .AsNoTracking()
                    .WhereIf(!string.IsNullOrEmpty(name),
                    x => x.Name.Contains(name))
                    .WhereIf(!string.IsNullOrEmpty(email),
                    x => x.Email.Contains(email))
                    .Select(u => new UserItem()
                    {
                        Id = u.Id,
                        Name = u.Name,
                        Email = u.Email,
                        Password = u.Password,
                        RoleId = u.Role.Id,
                        ImageUrl = u.ImageUrl,
                        UrlSlug = u.UrlSlug,
                        DepartmentId = u.Department.Id,
                        BirthDate= u.BirthDate,
                        DepartmentName = u.Department.Name
                    })
                    .ToPagedListAsync(pagingParams, cancellationToken);


        }
        public async Task<User> GetUserBySlugAsync(string slug, CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>().Include(u => u.Department)
                .FirstOrDefaultAsync(a => a.UrlSlug == slug, cancellationToken);
        }
        public async Task<User> GetUserByIdAsync(int id, CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>().Include(u => u.Department).FirstOrDefaultAsync(a => a.Id == id, cancellationToken);
        }

        public async Task<User> GetUserByIdIsDetailAsync(int userId, bool isDetail = false, CancellationToken cancellationToken = default)
        {
            if (!isDetail)
            {
                return await _context.Set<User>().FindAsync(userId);
            }
            return await _context.Set<User>().Where(a => a.Id == userId).FirstOrDefaultAsync(cancellationToken);
        }
        public async Task<bool> CreateOrUpdateProjectAsync(User user, CancellationToken cancellationToken = default)
        {
            if (user.Id > 0)
            {
                _context.Update(user);
            }
            else
            {
                _context.Add(user);
            }
            return await _context.SaveChangesAsync(cancellationToken) > 0;

        }


        public async Task<Project> GetProjectSlugAsync(string slug, CancellationToken cancellationToken = default)
        {
            IQueryable<Project> userQuery = _context.Set<Project>()
                .Where(p => p.UrlSlug == slug);

            return await userQuery.FirstOrDefaultAsync(cancellationToken);
        }

        public async Task<bool> AddOrUpdateAsync(
        User user, CancellationToken cancellationToken = default)
        {

            if (user.Id > 0)
            {
                _context.Users.Update(user);
                _memoryCache.Remove($"User.by-id.{user.Id}");
            }
            else
            {
                _context.Users.Add(user);
            }

            return await _context.SaveChangesAsync(cancellationToken) > 0;
        }

        public async Task<bool> DeleteUserAsync(
            int userId, CancellationToken cancellationToken = default)
        {
            return await _context.Users
                .Where(x => x.Id == userId)
                .ExecuteDeleteAsync(cancellationToken) > 0;
        }

        public async Task<bool> IsUserSlugExistedAsync(
            int userId,
            string slug,
            CancellationToken cancellationToken = default)
        {
            return await _context.Users
                .AnyAsync(x => x.Id != userId && x.UrlSlug == slug, cancellationToken);
        }

        public async Task<bool> SetImageUrlAsync(
            int userId, string imageUrl,
            CancellationToken cancellationToken = default)
        {
            return await _context.Users
                .Where(x => x.Id == userId)
                .ExecuteUpdateAsync(x =>
                    x.SetProperty(a => a.ImageUrl, a => imageUrl),
                    cancellationToken) > 0;
        }
        private IQueryable<Role> FilterRole(RoleQuery query)
        {
            IQueryable<Role> roleQuery = _context.Set<Role>()
                .Include(r => r.Users);


            if (!string.IsNullOrWhiteSpace(query.UserSlug))
            {
                roleQuery = roleQuery.Where(r => r.Users.Any(u => u.UrlSlug == query.UserSlug));
            }
            if (query.UserId > 0)
            {
                roleQuery = roleQuery.Where(r => r.Users.Any(u => u.Id == query.UserId));
            }
            return roleQuery;
        }
        private IQueryable<Project> FilterProject(ProjectQuery query)
        {
            IQueryable<Project> projectQuery = _context.Set<Project>()
                .Include(pr => pr.Users)
                .Include(pr => pr.Process)
                .Include(pr => pr.Posts);
            if (!string.IsNullOrEmpty(query.Name))
            {
                projectQuery = projectQuery.Where(pr => pr.Name.Contains(query.Name)
                || pr.ShortDescription.Contains(query.Name)
                || pr.UrlSlug.Contains(query.Name)
                || pr.Description.Contains(query.Name)
                );
            }

            if (!string.IsNullOrWhiteSpace(query.UserSlug))
            {
                projectQuery = projectQuery.Where(pr => pr.Users.Any(u => u.UrlSlug == query.UserSlug));
            }

            if (query.UserId > 0)
            {
                projectQuery = projectQuery.Where(pr => pr.Users.Any(u => u.Id == query.UserId));
            }


            return projectQuery;

        }



        public async Task<IPagedList<T>> GetPagedProjectsAsync<T>(ProjectQuery query,
        IPagingParams pagingParams,
        Func<IQueryable<Project>,
        IQueryable<T>> mapper,
        CancellationToken cancellationToken = default)
        {
            IQueryable<Project> projectFindQuery = FilterProject(query);
            IQueryable<T> tQueryResult = mapper(projectFindQuery);
            return await tQueryResult.ToPagedListAsync(pagingParams, cancellationToken);
        }

        public async Task<IPagedList<T>> GetPageRolesAsync<T>(
            RoleQuery query,
            IPagingParams pagingParams,
            Func<IQueryable<Role>,
            IQueryable<T>> mapper,
            CancellationToken cancellationToken = default)
        {
            IQueryable<Role> roleQuery = FilterRole(query);
            IQueryable<T> queryResult = mapper(roleQuery);
            return await queryResult.ToPagedListAsync(pagingParams, cancellationToken);
        }


        public async Task<User> GetUserDetailBySlug(string slug, CancellationToken cancellationToken = default)
        {
            IQueryable<User> userQuery = _context.Set<User>()
                //.Include(p => p.Projects)
                .Include(p => p.Posts);
            {
                if (!string.IsNullOrEmpty(slug))
                {
                    userQuery = userQuery.Where(u => u.UrlSlug == slug);
                }
                return await userQuery.FirstOrDefaultAsync(cancellationToken);
            }
        }

        public async Task<int> CountTotalUserAsync(CancellationToken cancellationToken = default)
        {
            return await _context.Set<User>().CountAsync(cancellationToken);
        }

        public async Task<bool> Register(string username, string password, string comfirmPassword, CancellationToken cancellationToken = default)
        {
            var user = _context.Set<User>().FirstOrDefault(x => x.Name == username);
            if (user != null)
            {
                return false;
            }
            if (password != comfirmPassword)
            {
                return false;
            }
            _context.Add(new User()
            {
                Name = username,
                UrlSlug = username.GenerateSlug(),
                Password = password.EncodePasswordToBase64(),
                // default info user register
                //RoleString = "user",
                RoleId = 2,
                DepartmentId = 1,


            });
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<User> Login(string username, string password, CancellationToken cancellationToken = default)
        {
            var user = _context.Set<User>().FirstOrDefault(x => x.Name == username);
            if (user == null)
            {
                return null;

            }
            var decodePassword = user.Password.DecodeFrom64();
            //var decodePassword = user.Password;

            if (password != decodePassword)
            {
                return null;
            }
            return user;
        }
        public async Task<bool> AddProjectsToUserAsync(List<int> projectIds, int userId, CancellationToken cancellationToken = default)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                throw new ArgumentException($"User with id {userId} not found");
            }

            var projects = await _context.Projects.Where(p => projectIds.Contains(p.Id)).ToListAsync(cancellationToken);
            if (projects.Count != projectIds.Count)
            {
                throw new ArgumentException("One or more projects not found");
            }

            foreach (var project in projects)
            {
                if (project.UserNumber <= project.Users.Count)
                {
                    throw new ArgumentException($"Project with id {project.Id} has reached maximum user capacity");
                }
                user.Projects.Add(project);
            }

            await _context.SaveChangesAsync(cancellationToken);

            return true;
        }
    }
	}
