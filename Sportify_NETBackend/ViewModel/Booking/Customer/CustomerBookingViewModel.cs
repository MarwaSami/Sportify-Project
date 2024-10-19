using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class CustomerBookingViewModel
    {
        public string PlaceName { get; set; }
        public int ReservitionId { get; set; }
        public float TotalPrice { get; set; }
        public string ReservitionDate { get; set; }
        public string ReservitionTime { get; set; }
        public string ReservitionEndTime { get; set; }
        public BookingStatus ReservitionStatus { get; set; } = BookingStatus.Pending;
        public bool IsReviewed { get; set; } = false;
        public int ReviewID { get; set; } = 0;
        // Done
        //Canceled
    }
}
