using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class TrainerSchedule
    {
        public int ID { get; set; }
        public virtual User Trainer { get; set; }
        public string TrainerID { get; set; }
        public string Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }


    }

}