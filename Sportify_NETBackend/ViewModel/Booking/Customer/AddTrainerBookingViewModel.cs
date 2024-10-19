using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class AddTrainerBookingViewModel
    {
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public string Day { get; set; }=DateTime.Now.DayOfWeek.ToString();
        public int TotalPrice { get; set; }
        public string? UserId { get; set; } = "";
        public string TrainerId { get; set; }
        public Status status { get; set; } = Status.Pending;
    }
}
