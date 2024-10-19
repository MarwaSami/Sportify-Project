using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class SchedulePlacePerhourViewModel
    {
        public int ID { get; set; }
        public int PlaceId { get; set; }
        public string Day { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public Scstatus Status { get; set; }  
        public string CapacityOFPlace { get; set; }
    }
    public enum Scstatus
    {
        Booked,
        Available,
        SemiAvailable
    }
}
