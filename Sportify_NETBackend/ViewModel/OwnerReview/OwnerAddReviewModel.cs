using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class OwnerAddReviewModel
    {
        public int ID { get; set; } = 0;
        public string? UserID { get; set; } = "";
        public int BookingID { get; set; } = 0;
        public int RateValue { get; set; }
        public string RateMsg { get; set; }

    }
}
