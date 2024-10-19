using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class OwnerReview
    {
        public int ID { get; set; }
        public virtual User User { get; set; }
        public string UserID { get; set; }
        public virtual Place place { get; set; }
        public int PlaceID { get; set; }
        public int RateValue { get; set; }
        public string RateMsg { get; set; }
    }

}