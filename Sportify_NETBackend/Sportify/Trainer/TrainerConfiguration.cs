//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Day10
//{
//    public class TrainerConfiguration : IEntityTypeConfiguration<Trainer>
//    {
//        public void Configure(EntityTypeBuilder<Trainer> builder)
//        {
//            builder.ToTable("Traineer");
//            builder.HasKey(t => t.ID);
//            builder.Property(t => t.ID).ValueGeneratedOnAdd();
//            builder.Property(t => t.Name).IsRequired().HasMaxLength(128);
//            builder.Property(i => i.PricePerSession).IsRequired();
//            builder.Property(i => i.ProfileImgUrl).IsRequired().HasMaxLength(128);
//            builder.Property(i => i.ModificationBy).IsRequired();
//            builder.Property(i => i.ModificationDate).HasDefaultValue(DateTime.Now);
//            builder.Property(i => i.IsDeleted).HasDefaultValue(false);
//            builder.HasOne(T=>T.Category).WithMany(C=>C.Trainers).HasForeignKey(T=>T.CategoryID)
//                .OnDelete(DeleteBehavior.Cascade);
//            builder.HasOne(T => T.Surface).WithMany(S => S.Trainers).HasForeignKey(T => T.SurfaceID)
//               .OnDelete(DeleteBehavior.Cascade);
//        }
//    }
//}
