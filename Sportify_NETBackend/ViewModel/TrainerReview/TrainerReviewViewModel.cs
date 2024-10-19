using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class TrainerReviewViewModel
    {
        public int ID { get; set; } = 0;
        public int RateValue { get; set; }
        public string Ratemsg { get; set; }
        public string? TrainerID { get; set; } = "";
        public int BookingID { get; set; }
        public string? UserID { get; set; } = "";
        public string ?UserName { get; set; } = "";
        public string? UserImg { get; set; } = "";

    }
}
