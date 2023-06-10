using ManageProject.Core.Entities;
using ManageProject.Data.Contexts;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.Data;
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


            var roles = AddRoles();
            var departments = AddDeparments();
            var users = AddUsers(roles, departments);

           
            var processes = AddProcesses();
            var topics = AddTopic();
            var project = AddProjects(users,processes, topics);
            var posts = AddPosts(users, project, departments);




        }
        private IList<Role> AddRoles()
        {
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
            foreach (var role in roles)
            {
                if (!_dbContext.Roles.Any(a => a.Name == role.Name))
                {
                    _dbContext.Roles.Add(role);
                }
            }
            _dbContext.SaveChanges();
            return roles;
        }
        private IList<User> AddUsers(
            IList<Role> roles,
            IList<Department> departments)
        {
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



                }
            };
            foreach (var user in users)
            {
                if (!_dbContext.Users.Any(a => a.UrlSlug == user.UrlSlug && a.Id == user.Id))
                {
                    _dbContext.Users.Add(user);
                }
            }
            _dbContext.SaveChanges();
            return users;
        }

        private IList<Process> AddProcesses()
        {
            var processes = new List<Process>()
            {
                new()
                {
                   
                    Name = "Chưa đăng ký",
                    UrlSlug = "chua-dang-ky"
                    
                },
                 new()
                {
				    Name = "Đã đăng ký",
					UrlSlug = "da-dang-ky"


				},
				  new()
				{
					Name = "Đang tạm dừng",
					UrlSlug = "dang-tam-dung"
				},

				  new()
                {
					Name = "Đã hoàn thành",
					UrlSlug = "da-hoan-thanh"
				}
				 

			};
            foreach (var process in processes)
            {
                if (!_dbContext.Processs.Any(a => a.UrlSlug == process.UrlSlug))
                {
                    _dbContext.Processs.Add(process);
                }
            }
            _dbContext.SaveChanges();
            return processes;
        }
		private IList<Topic> AddTopic()
		{
			var topics = new List<Topic>()
			{
				new()
				{

					Name = "Khoa học",
					UrlSlug = "khoa-hoc"

				},
				 new()
				{
					Name = "Công nghệ",
					UrlSlug = "cong-nghe"


				},
				  new()
				{
					Name = "Giao-duc",
					UrlSlug = "giao-duc"
				},

				  new()
				{
					Name = "Xã hội",
					UrlSlug = "xa-hoi"
				}


			};
			foreach (var topic in topics)
			{
				if (!_dbContext.Topics.Any(t => t.UrlSlug == topic.UrlSlug))
				{
					_dbContext.Topics.Add(topic);
				}
			}
			_dbContext.SaveChanges();
			return topics;
		}
		private IList<Department> AddDeparments()
        {
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
            foreach (var deparment in deparments)
            {
                if (!_dbContext.Departments.Any(a => a.Id == deparment.Id && a.UrlSlug == deparment.UrlSlug))
                {
                    _dbContext.Departments.Add(deparment);
                }
            }
            _dbContext.SaveChanges();
            return deparments;
        }
        private IList<Project> AddProjects(IList<User> users, IList<Process> processes, IList<Topic> topics)
        {
            var projects = new List<Project>()
            {
                new()
                {
                    Name= "Xây dựng ứng dụng quản lý công việc",
                    UrlSlug="xay-dung-ung-dung-quan-ly-cong-viec",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý công việc cho nhân viên",
                    ShortDescription="Quản lý công việc",
                    CostProject= "1000000",
                    UserNumber=2,
                    Users=  new List<User>()
                    {
                        users[1], users[2]
                    },
                    Register = false,
                    Process= processes[0],
                    Topic = topics[1],
					StartDate= DateTime.Now,
					EndDate= new DateTime(2023,6,26),// ngay nghiem thu
                    Note ="Sửa lại báo cáo"

				},
                 new()
                {
                    Name= "Xây dựng ứng dụng quản lý thời gian",
                    UrlSlug="xay-dung-ung-dung-quan-ly-thoi-gian",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý thời gian cho nhân viên",
                    ShortDescription="Quản lý thời gian",
                    CostProject= "2000000",
                    UserNumber=2,
                    Users=  new List<User>()
                    {
                        users[1], users[2]
                    },
                    Register = false,
                    Process= processes[2],
					Topic = topics[1],
					StartDate= DateTime.Now,
					EndDate= new DateTime(2023,8,26),// ngay nghiem thu
					Note =""



				},
                  new()
                {
                    Name= "Xây dựng ứng dụng thu hoạch",
                    UrlSlug="xay-dung-ung-dung-quan-ly-thu-hoach",
                    Description="Xây dựng hoàn thiện một ứng dụng để quản lý công tác thu hoạch",
                    ShortDescription="Quản lý thu hoạch",
                    CostProject= "1100000",
                    UserNumber=1,
                    Users= new List < User >() {
                        users[1]

                    },
                    Register = false,
                    Process= processes[1],
					Topic = topics[0],
					StartDate= DateTime.Now,
					EndDate= new DateTime(2023,9,16),// ngay nghiem thu
					Note ="Thực hiện tốt"


				},
                   new()
                {
                    Name= "Tìm hiểu về luật an toàn giao thông",
                    UrlSlug="tim-hieu-luat-an-toan-giao-thong",
                    Description="Tìm hiểu về luật an toàn giao thông",
                    ShortDescription="Quản lý công việc",
                    CostProject= "600000",
                    UserNumber=2,
                    Users= new List < User >() { users[1], users[2] },
                    Register = true,
                    Process= processes[0],
                    Topic= topics[3],
					StartDate= DateTime.Now,
					EndDate= new DateTime(2023,8,12),// ngay nghiem thu
					Note =""

				}
			};
            foreach (var project in projects)
            {
                if (!_dbContext.Projects.Any(a => a.UrlSlug == project.UrlSlug))
                {
                    _dbContext.Projects.Add(project);
                }
            }
            _dbContext.SaveChanges();
            return projects;
        }

        private IList<Post> AddPosts(IList<User> users, IList<Project> projects, IList<Department> department)
        {
            var posts = new List<Post>()
        {
            new()
            {
                Title="Post1",
                ShortDescription="Testing data",
                Status= true,
                User= users[1],
                UrlSlug="post1",
                  Created= DateTime.Now,
                Department = department[0],
                ViewCount=1,
                Projects= new List<Project>()
                {
                    projects[1],
                    projects[0]
                }
              

            },
             new()
            {
                Title="Post2",
                ShortDescription="Testing data",
                Status= true,
                User= users[1],
                UrlSlug="post2",
                  Created= DateTime.Now,
                Department = department[1],
                Projects= new List<Project>()
                {
                    projects[1],
                    projects[0]
                },
                ViewCount= 2

            },
             new()
            {
                Title="Post3",
                ShortDescription="Testing data",
                Status= true,
                User= users[0],
                UrlSlug="post3",
                Created= DateTime.Now,
                Department = department[2],
                Projects= new List<Project>()
                {
                    projects[1],

                },
                ViewCount= 3


            },

        };
            foreach (var post in posts)
            {
                if (!_dbContext.Posts.Any(a => a.UrlSlug == post.UrlSlug && a.Id == post.Id))
                {
                    _dbContext.Posts.Add(post);
                }
            }
            _dbContext.SaveChanges();

            return posts;
        }

    }
}