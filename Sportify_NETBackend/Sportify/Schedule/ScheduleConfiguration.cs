using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class ScheduleConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(EntityTypeBuilder<Schedule> builder)
        {
            builder.ToTable("Schedule");
            builder.HasKey(i => i.ID);
            builder.Property(i => i.ID).IsRequired();
            builder.Property(i => i.StartTime).IsRequired().HasMaxLength(60);
            builder.Property(i => i.EndTime).IsRequired().HasMaxLength(60);
            builder.Property(i => i.Day).IsRequired().HasMaxLength(60);
            builder.HasOne(S => S.Place).WithMany(P => P.Schedules)
                .HasForeignKey(S => S.PlaceId)
                .OnDelete(DeleteBehavior.Cascade).IsRequired();
        }
    }

}