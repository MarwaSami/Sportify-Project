using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class SetScheduleViewModel
    {

        public string TrainerID { get; set; } = "";
        public List<string> Day { get; set; }
        public List<DateTime> StartTime { get; set; }
        public List<DateTime> EndTime { get; set; }
    }
    public class getScheduleViewModel
    {
        public List<string> Day { get; set; }
        public List<DateTime> StartTime { get; set; }
        public List<DateTime> EndTime { get; set; }

    }
}
