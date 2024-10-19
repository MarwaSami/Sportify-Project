using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class CustomerTainerBookingViewModel
    {
        public string TrainerName { get; set; }
        public int ReservitionId { get; set; }
        public float TotalPrice { get; set; }
        public string ReservitionDate { get; set; }
        public string ReservitionTime { get; set; }
        public string ReservitionEndTime { get; set; }
        public string PhoneNumber { get; set; }
        public Status ReservitionStatus { get; set; } = Status.Pending;
        public bool IsReviewed { get; set; } = false;
        public int ReviewID { get; set; } = 0;
    }
}
