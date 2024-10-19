using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class BookingSelectViewModel
    {
            public int Count { get; set; }
            public DateTime StartTime { get; set; }
            public DateTime EndTime { get; set; }
            public BookingStatus Status { get; set; } = BookingStatus.Pending;
    }
}
