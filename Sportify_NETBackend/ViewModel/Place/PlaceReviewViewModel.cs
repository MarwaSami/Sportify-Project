using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class PlaceReviewViewModel
    {
        public int ID { get; set; }
        public int RateValue { get; set; }
        public string Ratemsg { get; set; }
        public string PlaceID { get; set; }
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string UserImg { get; set; }
    }
}
