using ManageProject.Core.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Mappings
{
    public class UserMap : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("Users");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Name)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(u => u.Email)
                .HasMaxLength(100);

            builder.Property(u => u.Password)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(u => u.ImageUrl)
                .HasMaxLength(200);

            builder.Property(u => u.UrlSlug)
                .HasMaxLength(100);

            builder.Property(u => u.BirthDate)
                .HasColumnType("datetime");

            builder.HasOne(u => u.Role)
                .WithMany(pj => pj.Users)
                .HasForeignKey(u => u.RoleId)
                .HasConstraintName("FK_Users_Roles")
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(u => u.Department)
                .WithMany(d => d.Users)
                .HasForeignKey(u => u.DepartmentId)
                .HasConstraintName("FK_Users_Departments")
                .OnDelete(DeleteBehavior.Cascade);
            builder.HasMany(u => u.Projects)
                  .WithMany(pr => pr.Users)
                  .UsingEntity(s => s.ToTable("Selected"));



            // test code
            builder.Property(x => x.RoleString)
                .IsRequired()
                .HasMaxLength(60)
                .HasDefaultValue("user");

            builder.HasOne<UserToken>(x => x.UserToken)
			  .WithOne(s => s.User)
			  .HasForeignKey<UserToken>(x => x.UserId);
		}
    }
}
