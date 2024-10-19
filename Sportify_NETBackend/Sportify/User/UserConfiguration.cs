using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            //builder.ToTable("User");
            builder.Property(i => i.NationalID).HasMaxLength(14);
            builder.Property(i => i.TaxRegister).HasMaxLength(50);
            builder.Property(t => t.Email).IsRequired().HasMaxLength(128);
            builder.Property(i => i.ModificationBy).IsRequired();
            builder.Property(i => i.ModificationDate).HasDefaultValue(DateTime.Now);
            builder.Property(i => i.JobTitle).HasDefaultValue("Job Title");
            builder.Property(i => i.Description).HasDefaultValue("Description");
            builder.Property(i => i.IsDeleted).HasDefaultValue(false);
            builder.Property(t => t.ProfileImg).IsRequired().HasMaxLength(128);

            builder.HasOne(T => T.Category).WithMany(C => C.Trainers).HasForeignKey(T => T.CategoryID)
           .OnDelete(DeleteBehavior.NoAction);
            builder.HasOne(T => T.Surface).WithMany(S => S.Trainers).HasForeignKey(T => T.SurfaceID)
               .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
