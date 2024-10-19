using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class PlaceAttachmentConfiguration : IEntityTypeConfiguration<PlaceAttachments>
    {
        public void Configure(EntityTypeBuilder<PlaceAttachments> builder)
        {
            builder.ToTable("PlaceAttachment");
            builder.HasKey(x => x.ID);
            builder.Property(PA => PA.ID).ValueGeneratedOnAdd();
            builder.Property(PA => PA.Name).HasMaxLength(250);
            builder.Property(i => i.ModificationBy).IsRequired();
            builder.Property(i => i.ModificationDate).HasDefaultValue(DateTime.Now);
            builder.Property(i => i.IsDeleted).HasDefaultValue(false);
            builder.HasOne(PA => PA.Place).WithMany(P => P.Attachments).HasForeignKey(PA => PA.PlaceID)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }

}