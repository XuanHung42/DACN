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
    public class CheckProcessMap : IEntityTypeConfiguration<CheckProcess>
    {
        public void Configure(EntityTypeBuilder<CheckProcess> builder)
        {
            builder.ToTable("CheckProcess");
            builder.HasKey(c => c.Id);

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
