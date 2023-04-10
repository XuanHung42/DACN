using ManageProject.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Mappings
{
    public class ProjectMap : IEntityTypeConfiguration<Project>

    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.ToTable("Project");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(p => p.Description)
                .IsRequired()
                .HasMaxLength(500);
            builder.Property(p=> p.UrlSlug) 
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(p => p.CostProject)
            .HasMaxLength(300)
            .IsRequired();

          
            builder.Property(p => p.UserNumber)
              .IsRequired()
              .HasDefaultValue(0);
            builder.HasOne(p => p.User)
                  .WithMany(u => u.Projects)
                  .HasForeignKey(p => p.UserId)
                  .HasConstraintName("FK_Projects_Users");





        }
    }
}
