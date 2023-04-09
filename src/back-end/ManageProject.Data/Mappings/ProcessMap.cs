using ManageProject.Core.Contracts;
using ManageProject.Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ManageProject.Data.Mappings;

public class ProcessMap : IEntityTypeConfiguration<Process>
{
	public void Configure(EntityTypeBuilder<Process> builder)
	{
		builder.ToTable("Processes");

		builder.HasKey(pc => pc.Id);

		builder.Property(pc => pc.ExcutionTime)
		 .HasMaxLength(500)
		 .IsRequired();

		builder.HasOne(pc => pc.Project)
			.WithMany(pj => pj.Process)
			.HasForeignKey(pc => pc.CheckProcessId)
			.HasConstraintName("FK_Process_CheckProces");


	}
}

