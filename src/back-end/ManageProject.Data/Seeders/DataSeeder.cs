using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Seeders
{
    public class DataSeeder : IDataSeeder
    {
        private readonly ManageDbContext _dbContext;

        public DataSeeder(ManageDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Initialize()
        {
            _dbContext.Database.EnsureCreated();
            if (_dbContext.Projects.Any()) return;


            var checkProcesses = AddCheckProcesses();
            var roles = AddRoles();
            var departments = AddDeparments();
            var users = AddUsers(roles, departments);
            
            var processes = AddProcesses(checkProcesses);
            var project = AddProjects(users,processes);
          
            var posts = AddPosts(users,project);
            
            


        }
        private IList<Role> AddRoles() { 
        var roles = new List<Role>()
        {
            new()
            {
                Name = "admin",
                Description = "admin",

            },
             new()
            {
                Name = "user",
                Description = "user",

            }
        };
            _dbContext.Roles.AddRange(roles);
            _dbContext.SaveChanges();
            return roles;
        }
        private IList<User> AddUsers(
            IList<Role> roles, 
            IList<Department> departments) {
            var users = new List<User>()
            {
                new()
                {
                    Name= "admin1",
                    Password="123",
                    Email="admin@gmail.com",
                    Role= roles[0],
                    BirthDate= new DateTime(2022,9,30),
                    UrlSlug= "admin1",
                    Department = departments[0],
                    ImageUrl="",

                    

                },
                 new()
                {
                    Name= "admin2",
                    Password="123",
                    Email="admin@gmail.com",
                    Role= roles[0],
                    BirthDate= new DateTime(2022,10,30),
                    UrlSlug= "admin2",
                    Department = departments[0],
                    ImageUrl="",
                   



                },
                  new()
                {
                    Name= "testUser",
                    Password="123",
                    Email="user@gmail.com",
                    Role= roles[1],
                    BirthDate= new DateTime(2022,9,30),
                    UrlSlug= "test-user",
                    Department = departments[1],
                    ImageUrl="",
                   


                }
            };
            _dbContext.Users.AddRange(users);
            _dbContext.SaveChanges();
            return users;
        }

        private IList<Process> AddProcesses(IList<CheckProcess> checkProcesses) {
            var processes = new List<Process>()
            {
                new()
                {
                    
                    ExcutionTime= "2 mouth",
                    CheckProcess= checkProcesses[0]
                },
                 new()
                {
                    ExcutionTime= "1 mouth",
                    CheckProcess= checkProcesses[1]
                },
                  new()
                {
                    ExcutionTime= "3 mouth",
                    CheckProcess= checkProcesses[2]
                }
            };
            _dbContext.AddRange(processes);
            _dbContext.SaveChanges();
            return processes;
        }
        private IList<Department> AddDeparments() {
            var deparments = new List<Department>() {
                new()
                {
                    Name= "Công nghệ thông tin",
                    UrlSlug="cong-nghe-thong-tin",
                    
                },
               new()
                {
                    Name= "Quản trị kinh doanh",
                    UrlSlug="quan-tri-kinh-doanh",

                },
                new()
                {
                    Name= "Luật",
                    UrlSlug="luat",

                },
                new()
                {
                    Name= "Sư phạm",
                    UrlSlug="su-pham",

                },
                
            };
            _dbContext.AddRange(deparments);
            _dbContext.SaveChanges();
            return deparments;
        }
        private IList<Project> AddProjects(IList<User> users, IList<Process> processes) {
            var projects = new List<Project>()
            {
                new()
                {
                    Name= "Xây dựng ứng dụng quản lý công việc",
                    UrlSlug="xay-dung-ung-dung-quan-ly-cong-viec",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý công việc cho nhân viên",
                    ShortDescription="Quản lý công việc",
                    CostProject= "1000000 VND",
                    UserNumber=1,
                    Users= users,
                     Processes = new List<Process>()
                    {
                       processes[1]
                    }

                },
                 new()
                {
                    Name= "Xây dựng ứng dụng quản lý công việc",
                    UrlSlug="xay-dung-ung-dung-quan-ly-cong-viec",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý công việc cho nhân viên",
                    ShortDescription="Quản lý công việc",
                    CostProject= "1000000 VND",
                    UserNumber=1,
                    Users= users,
                    Processes = new List<Process>()
                    {
                       processes[1]
                    }

                },
                  new()
                {
                    Name= "Xây dựng ứng dụng thu hoạch",
                    UrlSlug="xay-dung-ung-dung-quan-ly-thu-hoach",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý công tác thu hoạch",
                    ShortDescription="Quản lý thu hoạch",
                    CostProject= "1100000 VND",
                    UserNumber=1,
                    Users= users,
                    Processes = new List<Process>()
                    {
                       processes[0]
                    }

                },
                   new()
                {
                    Name= "Tìm hiểu về luật an toàn giao thông",
                    UrlSlug="tim-hieu-luat-an-toan-giao-thong",
                    Description="Tìm hiểu về luật an toàn giao thông",
                    ShortDescription="Quản lý công việc",
                    CostProject= "200000 VND",
                    UserNumber=1,
                    Users= users,
                    Processes = new List<Process>()
                    {
                       processes[2]
                    }

                }
            };
            _dbContext.AddRange(projects);
            _dbContext.SaveChanges();
            return projects;
        }
        private IList<CheckProcess> AddCheckProcesses() { 
            var checkProcesses = new List<CheckProcess>()
            {
                new()
                {
                    Complete= true,
                    Start= true,
                    StartMaking= true,
                    Status= true,
                    WriteReport= true,
                },
                 new()
                {
                    Complete= false,
                    Start= true,
                    StartMaking= true,
                    Status= true,
                    WriteReport= false,
                },
                  new()
                {
                    Complete= false,
                    Start= false,
                    StartMaking= false,
                    Status= true,
                    WriteReport= false,
                }
            };
            _dbContext.AddRange(checkProcesses);
            _dbContext.SaveChanges();
            return checkProcesses;
        }
        
        private IList<Post> AddPosts(IList<User> users, IList<Project> projects) {
        var posts = new List<Post>()
        {
            new()
            {
                Title="Post1",
                ShortDecription="Testing data",
                Status= true,
                User= users[1],
                UrlSlug="post1",
                Projects= new List<Project>()
                {
                    projects[1],
                    projects[0]
                }
                
            },
             new()
            {
                Title="Post2",
                ShortDecription="Testing data",
                Status= true,
                User= users[2],
                UrlSlug="post2",
                Projects= new List<Project>()
                {
                    projects[1],
                    projects[0]
                }

            },
             new()
            {
                Title="Post3",
                ShortDecription="Testing data",
                Status= true,
                User= users[0],
                UrlSlug="post3",
                Projects= new List<Project>()
                {
                    projects[1],
                    projects[2]
                }

            },

        };
            _dbContext.AddRange(posts);
            _dbContext.SaveChanges(); 
            
            return posts;
        }

    }
}
