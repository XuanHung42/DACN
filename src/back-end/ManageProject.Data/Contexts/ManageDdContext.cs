using ManageProject.Core.Entities;
using ManageProject.Data.Mappings;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Contexts
{
    public class BlogDbContext : DbContext
    {
        public DbSet<CheckProcess> CheckProcesses { get; set; }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Process> Processs { get; set; }

        public DbSet<Project> Projects { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(
            DbContextOptionsBuilder optionsBuilder)
        {
            // sau này ko dùng tới chỗ này 
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-JS68JVN\SQLEXPRESS;Database=NCKHGV;Trusted_Connection=True;MultipleActiveResultSets=True;TrustServerCertificate=True;");
            //    // server name : DESKTOP-JS68JVN\SQLEXPRESS
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(DepartmentMap).Assembly);
        }


        // test

    }
}