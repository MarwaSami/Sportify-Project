using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class AdminCount
    {
        public int Customers { get; set; }
        public int Owners { get; set; }
        public int Trainers { get; set; }
        public int Places { get; set; }
        public int PlaceBooking { get; set; }
        public float PlaceTotalEarnings { get; set; }
        public int TrainerBooking { get;set; }
        public float TrainerTotalEarnings { get; set; }

    }
}
