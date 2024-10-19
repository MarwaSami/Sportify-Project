using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class OwnerPlaceDetailsViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Facilities { get; set; }
        public string Category { get; set; }
        public string Address { get; set; }
        public List<OwnerBookingViweModel> Bookings { get; set; }
        public List<string> Attachments { get; set; }

    }
}
