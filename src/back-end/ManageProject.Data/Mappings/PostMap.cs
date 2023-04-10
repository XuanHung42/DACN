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

    public class PostMap : IEntityTypeConfiguration<Post>
    {
        public void Configure(EntityTypeBuilder<Post> builder)
        {
            builder.ToTable("Posts");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Title)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(p => p.ShortDecription)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.UrlSlug)
                .IsRequired()
                .HasMaxLength(50);

            builder.Property(p => p.File)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(p => p.Status)
                .IsRequired()
                .HasDefaultValue(false);

            builder.Property(p => p.Created)
                .HasColumnType("datetime");

            builder.HasOne(p => p.User)
                .WithMany(u => u.Posts)
                .HasForeignKey(p => p.UserId)
                .HasConstraintName("FK_Posts_Users");
            //.OnDelete(DeleteBehavior.Cascade);

            


        }
    }
}