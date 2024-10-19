using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ViewModel
{
    public class OwnerReviewViewModel
    {
        public int ID { get; set; }
        public string UserID { get; set; }
        public int PlaceID { get; set; }
        public int RateValue { get; set; }
        public string RateMsg { get; set; }
        public UserViewModel User { get; set; }
        public  PlaceViewModel Place { get; set; }
    }
    public class PlaceHomeReviewViewModel
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public  string  UserImg { get; set; }
        public string PlaceName { get; set; }
        public int RateValue { get; set; }
        public string RateMsg { get; set; }
    }
}
