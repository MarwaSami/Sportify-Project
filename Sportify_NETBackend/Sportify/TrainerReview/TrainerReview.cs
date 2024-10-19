using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class TrainerReview
    {
        public int ID { get; set; }
        public int RateValue { get; set; }
        public string Ratemsg { get; set; }
        public virtual User Trainer { get; set; }
        public string TrainerID { get; set; }
        public virtual User User { get; set; }
        public string UserID { get; set; }
    }

}