
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
namespace Models
{
    public class User : IdentityUser

    {
        public int ? NationalID { get; set; }
        public string Location { get; set; }
        public string ProfileImg { get; set; }
        public int? TaxRegister { get; set; }
        //Trainer
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public virtual Category? Category { get; set; }
        public int? CategoryID { get; set; }
        public virtual Surface? Surface { get; set; }
        public int? SurfaceID { get; set; }
        public float? PricePerSession { get; set; }
        // update 
        public string ModificationBy { get; set; }
        public DateTime ModificationDate { get; set; }
        public bool IsDeleted { get; set; }

        // booking 
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<PreferredSport> PreferredSports { get; set; }
        // user Review for trainer
        public virtual ICollection<TrainerReview> TReviews { get; set; }

        // user Revew for place 
        public virtual ICollection<OwnerReview> OwnerReviews { get; set; }
        // places if user is owner
        public virtual ICollection<Place> Places { get; set; }
        // For trainer 
        // Trainer Review
        public virtual ICollection<TrainerReview> Reviews { get; set; }
        public virtual ICollection<TrainerSchedule> TrainerSchedules { get; set; }

        // Trainer Clients(user)
        public virtual ICollection<UserTrainer> Users { get; set; }
        // user Trainers 
        public virtual ICollection<UserTrainer> Trainers { get; set; }

    }

}