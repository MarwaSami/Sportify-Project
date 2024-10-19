using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class SeemyPlaceViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public float PricePerHour { get; set; }
        public float RateValue { get; set; } = 0;
        public List<string> Facilities { get; set; }
        public List<string> Attachments { get; set; }
    }
}
