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
            builder.Property(p => p.UrlSlug)
                .IsRequired()
                .HasMaxLength(100);
            builder.Property(p => p.CostProject)
                .HasMaxLength(300)
                .IsRequired();

            builder.Property(p => p.StartDate)
                .HasColumnType("datetime");

			builder.Property(p => p.EndDate)
				.HasColumnType("datetime");

            builder.Property(p => p.Note)
                .HasMaxLength(300);

			builder.Property(p => p.UserNumber)
              .IsRequired()
              .HasDefaultValue(0);

            builder.Property(p => p.Register)
             .IsRequired()
             .HasDefaultValue(false);


            builder.HasOne(u => u.Process)
            .WithMany(pr => pr.Projects)
            .HasForeignKey(u => u.ProcessId)
            .HasConstraintName("FK_Process_Project");




        }
    }
}