using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class TrainerScheduleConfiguration : IEntityTypeConfiguration<TrainerSchedule>
    {
        public void Configure(EntityTypeBuilder<TrainerSchedule> builder)
        {
            builder.ToTable("TrainerSchedule");
            builder.HasKey(i => i.ID);
            builder.Property(i => i.ID).IsRequired();
            builder.Property(i => i.StartTime).IsRequired().HasMaxLength(60);
            builder.Property(i => i.EndTime).IsRequired().HasMaxLength(60);
            builder.Property(i => i.Day).IsRequired().HasMaxLength(60);
            builder.HasOne(S => S.Trainer).WithMany(P => P.TrainerSchedules)
                .HasForeignKey(S => S.TrainerID)
                .OnDelete(DeleteBehavior.NoAction).IsRequired();
        }
    }

}