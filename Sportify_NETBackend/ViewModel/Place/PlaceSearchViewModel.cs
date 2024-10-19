using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class PlaceSearchViewModel
    {
        public string City { get; set; } = string.Empty;
        public DateTime AvailableTime { get; set; }= DateTime.Now;
        public int CategoryID { get; set; } = 0;
        public int pageSize { get; set; } = 8;
        public int pageIndex { get; set; } = 1;

    }
}
