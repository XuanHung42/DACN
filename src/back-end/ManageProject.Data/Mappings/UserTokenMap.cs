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
	public class UserTokenMap : IEntityTypeConfiguration<UserToken>
	{
		public void Configure(EntityTypeBuilder<UserToken> builder)
		{
			builder.ToTable("UserToken");
			builder.HasKey(x => x.Id);
			builder.Property(x => x.Token)
				.HasMaxLength(500)
				.IsRequired(false);
			builder.Property(x => x.Expired).HasColumnType("datetime");
			builder.Property(x => x.Status).HasColumnType("bit").HasDefaultValue(false);

		}
	}
}
