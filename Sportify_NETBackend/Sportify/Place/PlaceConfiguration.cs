using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class PlaceConfiguration : IEntityTypeConfiguration<Place>
    {
        public void Configure(EntityTypeBuilder<Place> builder)
        {
            builder.ToTable("Place");
            builder.HasKey(p => p.ID);
            builder.Property(p => p.ID).ValueGeneratedOnAdd();
            builder.Property(p => p.Name).IsRequired().HasMaxLength(250);
            builder.Property(p => p.Capacity).IsRequired();
            builder.Property(p => p.PricePerhour).IsRequired();
            builder.Property(p => p.Street).HasMaxLength(250);
            builder.Property(i => i.ModificationBy).IsRequired();
            builder.Property(i => i.ModificationDate).HasDefaultValue(DateTime.Now);
            builder.Property(i => i.IsDeleted).HasDefaultValue(false);
            builder.HasOne(P => P.category).WithMany(C => C.Places).HasForeignKey(P => P.CategoryID)
            .OnDelete(DeleteBehavior.Cascade).IsRequired();
            builder.HasOne(P => P.Owner).WithMany(O => O.Places).HasForeignKey(P => P.OwnerID)
            .OnDelete(DeleteBehavior.NoAction).IsRequired();
            builder.HasOne(P => P.Surface).WithMany(S => S.Places).HasForeignKey(P => P.SurfaceID)
            .OnDelete(DeleteBehavior.Cascade).IsRequired();
            builder.HasOne(P => P.Type).WithMany(T => T.Places).HasForeignKey(P => P.TypeID)
            .OnDelete(DeleteBehavior.Cascade).IsRequired();
        }
    }

}