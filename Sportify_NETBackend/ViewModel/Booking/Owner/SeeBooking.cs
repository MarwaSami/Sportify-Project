using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class SeeBooking
    {
        public int ID { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public float TotalPrice { get;set; }
        public int Count { get; set; }
        public string UserName { get; set; }
        public string PlaceName { get; set; }
        public DateOnly ReservationDate { get; set; }
        public BookingStatus Status { get; set; } = BookingStatus.Pending;

    }
}
