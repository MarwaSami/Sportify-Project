
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class SportfiyContext : IdentityDbContext<User>
    {
        public SportfiyContext(DbContextOptions options) : base(options) { }
        public DbSet<BBlog> Blogs { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Facility> Facilities { get; set; }
        public DbSet<FacilityPlace> FacilityPlaces { get; set; }
        public DbSet<OwnerReview> OwnerReviews { get; set; }
        public DbSet<Place> Places { get; set; }
        public DbSet<PlaceAttachments> PlaceAttachments { get; set; }
        public DbSet<PreferredSport> PreferredSports { get; set; }
        public DbSet<Schedule> Scheudles { get; set; }
        public DbSet<TrainerSchedule> TrainerSchedules { get; set; }
        public DbSet<Surface> Surfaces { get; set; }
        public DbSet<TrainerReview> TrainerReviews { get; set; }
        public DbSet<Type> Types { get; set; }
        public DbSet<UserTrainer> UserTrainers { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.ApplyConfiguration(new BlogConfiguration());
            modelBuilder.ApplyConfiguration(new BookingConfiguration());
            modelBuilder.ApplyConfiguration<Category>(new CategryConfiguration());
            modelBuilder.ApplyConfiguration<Facility>(new FacilityConigurations());
            modelBuilder.ApplyConfiguration(new FacilityPlaceConfiguration());
            modelBuilder.ApplyConfiguration(new OwnerReviewConfiguration());
            modelBuilder.ApplyConfiguration<Place>(new PlaceConfiguration());
            modelBuilder.ApplyConfiguration(new PlaceAttachmentConfiguration());
            modelBuilder.ApplyConfiguration(new PreferredSportConfiguration());
            modelBuilder.ApplyConfiguration(new ScheduleConfiguration());
            modelBuilder.ApplyConfiguration(new TrainerScheduleConfiguration());
            modelBuilder.ApplyConfiguration(new SurfaceConfigration());
            modelBuilder.ApplyConfiguration(new TrainerReviewConfiguration());
            modelBuilder.ApplyConfiguration(new TypeConfigration());
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new UserTrainerConfiguration());    

            modelBuilder.DataSeed();

            base.OnModelCreating(modelBuilder);

        }

    }
}
