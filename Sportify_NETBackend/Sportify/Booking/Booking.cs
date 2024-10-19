using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public enum BookingStatus
    {
        Pending,
        Confirmed,
        Completed,
        Rejected
    }
    public class Booking
    {
        public int ID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public float TotalPrice { get; set; }
        public int Code { get; set; }
        public int Count { get; set; }
        public virtual User User { set; get; }
        public string UserID { set; get; }
        public virtual Place Place { set; get; }
        public int PlaceID { set; get; }
        public BookingStatus Status { get; set; }
        public bool ISSeen { get; set; }
    }


}
