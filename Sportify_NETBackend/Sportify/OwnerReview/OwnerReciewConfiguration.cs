using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class OwnerReviewConfiguration : IEntityTypeConfiguration<OwnerReview>
    {
        public void Configure(EntityTypeBuilder<OwnerReview> builder)
        {
            builder.ToTable("OwnerReview");
            builder.HasKey(x => x.ID);
            builder.HasOne(x => x.place).WithMany(i => i.OwnerReviews).HasForeignKey(x => x.PlaceID);
            builder.HasOne(x => x.User).WithMany(i => i.OwnerReviews).HasForeignKey(x => x.UserID);
            builder.Property(x => x.RateValue).IsRequired().HasMaxLength(16);
            builder.Property(x => x.RateMsg).HasMaxLength(265);
        }
    }

}