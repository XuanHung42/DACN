using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ManageProject.Core.Entities;

namespace ManageProject.Data.Mappings
{
    public class ProcessMap : IEntityTypeConfiguration<Process>
    {
        public void Configure(EntityTypeBuilder<Process> builder)
        {
            builder.ToTable("Processes");

            builder.HasKey(pc => pc.Id);

            builder.Property(pc => pc.ExcutionTime)
             .HasMaxLength(500)
             .IsRequired();

            builder.Property(c => c.Start)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(c => c.StartMaking)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(c => c.WriteReport)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(c => c.Complete)
                .IsRequired()
                .HasDefaultValue(false);
            builder.Property(c => c.Status)
                .IsRequired()
                .HasDefaultValue(false);
            

        }
    }
}