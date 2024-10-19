using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;

namespace Models
{
    public class PreferredSportConfiguration : IEntityTypeConfiguration<PreferredSport>
    {
        public void Configure(EntityTypeBuilder<PreferredSport> builder)
        {
            builder.ToTable("PreferredSport");
            builder.HasKey(i => i.ID);
            builder.Property(i => i.ID).ValueGeneratedOnAdd();

            builder.HasOne(i => i.User).WithMany(i => i.PreferredSports)
              .HasForeignKey(i => i.UserID)
              .IsRequired();


            builder.HasOne(i => i.Category).WithMany(i => i.PreferredSport)
             .HasForeignKey(i => i.CategoryID)
             .IsRequired();


        }
    }
}