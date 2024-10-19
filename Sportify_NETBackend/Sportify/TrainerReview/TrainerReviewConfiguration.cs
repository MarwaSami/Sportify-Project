using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class TrainerReviewConfiguration : IEntityTypeConfiguration<TrainerReview>
    {
        public void Configure(EntityTypeBuilder<TrainerReview> builder)
        {
            builder.ToTable("TrainerReview");
            builder.HasKey(TR => TR.ID);
            builder.Property(TR => TR.ID).ValueGeneratedOnAdd();
            builder.Property(TR => TR.RateValue).IsRequired();
            builder.Property(TR => TR.Ratemsg).IsRequired().HasMaxLength(1000);
            builder.HasOne(TR => TR.Trainer).WithMany(T => T.Reviews).HasForeignKey(TR => TR.TrainerID)
                .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(TR => TR.User).WithMany(U => U.TReviews).HasForeignKey(TR => TR.UserID)
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
