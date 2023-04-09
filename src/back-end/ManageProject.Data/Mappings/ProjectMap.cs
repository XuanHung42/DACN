using ManageProject.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Mappings;

public class ProjectMap :IEntityTypeConfiguration<Project>
{
	public void Configure(EntityTypeBuilder<Project> builder)
	{
		builder.ToTable("Projects");

		builder.HasKey(pj => pj.Id);

		builder.Property(pj => pj.Name)
			.HasMaxLength(300)
			.IsRequired();

		builder.Property(pj => pj.Description)
			.HasMaxLength(1000)
			.IsRequired();

		builder.Property(pj => pj.UrlSlug)
			.HasMaxLength(300)
			.IsRequired();

		builder.Property(pj => pj.CostProject)
			.HasMaxLength(300)
			.IsRequired();

		// số lượng user làm dự án
		builder.Property(pj => pj.UserNumber)
		  .IsRequired()
		  .HasDefaultValue(0);

		builder.HasOne(pj => pj.User)
			.WithMany(u => u.Projects)
			.HasForeignKey(pj => pj.UserId)
			.HasForeignKey("FK_Projects_User");


	}
}
