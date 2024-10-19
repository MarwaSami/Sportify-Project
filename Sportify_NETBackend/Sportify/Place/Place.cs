using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class Place
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Capacity { get; set; }
        public float PricePerhour { get; set; }
        public double Lang { get; set; }
        public double Lat { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public virtual Category category { get; set; }
        public int CategoryID { get; set; }
        public virtual User Owner { get; set; }
        public string OwnerID { get; set; }
        public virtual Surface Surface { get; set; }
        public int SurfaceID { get; set; }
        public virtual Type Type { get; set; }
        public int TypeID { get; set; }
        public string ModificationBy { get; set; }
        public DateTime ModificationDate { get; set; }
        public bool IsDeleted { get; set; }
        public virtual ICollection<FacilityPlace> FacilityPlaces { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual ICollection<PlaceAttachments> Attachments { get; set; }
        public virtual ICollection<Schedule> Schedules { get; set; }
        public virtual ICollection<OwnerReview> OwnerReviews { get; set; }


    }

}