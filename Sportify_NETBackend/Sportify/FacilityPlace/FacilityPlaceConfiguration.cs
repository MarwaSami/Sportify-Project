using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class FacilityPlaceConfiguration : IEntityTypeConfiguration<FacilityPlace>
    {
        public void Configure(EntityTypeBuilder<FacilityPlace> builder)
        {
            builder.ToTable("FacilityPlace");
            builder.HasKey(x => x.ID);
            builder.Property(x => x.ID).ValueGeneratedOnAdd();
            builder.HasOne(FP => FP.Facility).WithMany(F => F.FacilityPlaces).HasForeignKey(FP => FP.FacilityID)
                .OnDelete(DeleteBehavior.Restrict).IsRequired();
            builder.HasOne(FP => FP.Place).WithMany(P => P.FacilityPlaces).HasForeignKey(FP => FP.PlaceID)
        .OnDelete(DeleteBehavior.Restrict).IsRequired();

        }
    }

}