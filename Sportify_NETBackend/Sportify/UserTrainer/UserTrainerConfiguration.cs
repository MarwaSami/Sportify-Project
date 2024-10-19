using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UserTrainerConfiguration : IEntityTypeConfiguration<UserTrainer>
    {
        public void Configure(EntityTypeBuilder<UserTrainer> builder)
        {
            builder.ToTable("UserTrainer");
            builder.HasKey(t => t.ID);
            builder.Property(t => t.ID).ValueGeneratedOnAdd();     
            builder.Property(i => i.TotalPrice).IsRequired().HasMaxLength(255);
            builder.HasOne(UT => UT.User).WithMany(U => U.Trainers).HasForeignKey(UT => UT.UserId);
            builder.HasOne(UT => UT.Trainer).WithMany(T => T.Users).HasForeignKey(UT => UT.TrainerId);
        }
    }
}
