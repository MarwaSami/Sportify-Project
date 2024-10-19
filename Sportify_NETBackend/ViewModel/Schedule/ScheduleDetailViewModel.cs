using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class ScheduleDetailViewModel
    {
        public string dayofWeek { get; set; }
        public DateOnly date { get; set; }
        public List<SchedulePerHour> schedule { get; set; }= new List<SchedulePerHour>();
        public bool IsWorking { get; set; } = false;
    }
    public class SchedulePerHour
    {
        public int period { get; set; }
        public int duration { get; set; }
        public SchStatus status { get;set; }
        public int capacity { get; set; }

    }
    public enum SchStatus
    {
        Booked,
        Available,
        SemiAvailable
    }
}
