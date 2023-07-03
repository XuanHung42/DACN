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
	public class TopicMap : IEntityTypeConfiguration<Topic>
	{
		public void Configure(EntityTypeBuilder<Topic> builder)
		{
			builder.ToTable("Topics");

			builder.HasKey(t => t.Id);

			builder.Property(t => t.Name)
			 .HasMaxLength(1000)
			 .IsRequired();

			builder.Property(t => t.UrlSlug)
				.IsRequired()
				.HasDefaultValue(false);
		}
	}
}
