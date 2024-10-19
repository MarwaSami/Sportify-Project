

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
namespace Models
{
    public class BlogConfiguration : IEntityTypeConfiguration<BBlog>
    {
        public void Configure(EntityTypeBuilder<BBlog> builder)
        {
            builder.ToTable("AdminBlog");
            builder
                .HasKey(i => i.ID);
            builder.Property(i => i.ID).ValueGeneratedOnAdd();
            builder.HasOne(i => i.Category).WithMany(i => i.Blogs)
                .HasForeignKey(i => i.CategoryID).OnDelete(DeleteBehavior.Cascade).IsRequired();
            builder.Property(i => i.Title).IsRequired().HasMaxLength(250);
            builder.Property(i => i.Content).IsRequired().HasMaxLength(int.MaxValue);
            builder.Property(i => i.ModificationBy).IsRequired();
            builder.Property(i => i.ModificationDate).HasDefaultValue(DateTime.Now);
            builder.Property(i => i.IsDeleted).HasDefaultValue(false);

        }
    }
}