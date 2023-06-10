using ManageProject.Core.Entities;
using ManageProject.Data.Mappings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Contexts
{
	public class ManageDbContext : DbContext
	{

		public DbSet<Department> Departments { get; set; }

		public DbSet<Post> Posts { get; set; }

		public DbSet<Process> Processs { get; set; }

		public DbSet<Project> Projects { get; set; }

		public DbSet<Role> Roles { get; set; }

		public DbSet<User> Users { get; set; }
		
		public DbSet<Topic> Topics { get; set; }

        
        public ManageDbContext(DbContextOptions<ManageDbContext> options) : base(options) { }

        public ManageDbContext()
        {
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DepartmentMap).Assembly);
        }


	}
}