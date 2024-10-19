

using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.Reflection.Emit;
namespace Models
{
    public class BookingConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("Booking");
            builder
                .HasKey(i => i.ID);
            builder.Property(i => i.ID).ValueGeneratedOnAdd();

            builder.HasOne(B => B.User).WithMany(U => U.Bookings)
               .HasForeignKey(B => B.UserID)
               .IsRequired();

            builder.HasOne(B => B.Place).WithMany(P => P.Bookings)
               .HasForeignKey(B => B.PlaceID)
               .IsRequired();
        }
    }
}