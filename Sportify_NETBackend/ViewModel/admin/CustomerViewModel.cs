using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class CustomerViewModel
    {
        public int? NationalID { get; set; }
        public string ID { get; set; }
        public string ProfileImg { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Location { get; set; }
    }
}
