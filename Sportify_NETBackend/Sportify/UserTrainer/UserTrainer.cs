using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Models
{
    public class UserTrainer
    {
        public int ID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public int TotalPrice { get; set; }
        public virtual User User { get; set; }
        public string UserId { get; set; }
        public virtual User Trainer { get; set; }
        public string TrainerId { get; set; }
        public Status Status { get; set; }
    }

}