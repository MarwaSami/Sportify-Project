using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{

    public class ScheduleViewModel
    {
        public int ID { get; set; } = 0;
        public int PlaceId { get; set; } = 0;
        [JsonProperty("Day")]
        public string Day { get; set; }
        [JsonProperty("StartTime")]
        public DateTime StartTime { get; set; }
        [JsonProperty("EndTime")]
        public DateTime EndTime { get; set; }
    }
}
