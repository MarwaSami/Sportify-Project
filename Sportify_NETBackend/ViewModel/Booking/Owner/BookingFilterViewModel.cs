using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class BookingFilterViewModel
    {
        public string PlaceName { get; set; } = "";
        public float Price { get; set; } = 0;
        public DateTime date { get; set; } = DateTime.Now;

        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public int pageSize { get; set; } = 6;
        public int pageIndex { get; set; } = 1;
    }
    public class ReservationFilterViewModel
    {
        public float Price { get; set; } = 0;
        public DateTime date { get; set; } = DateTime.Now;

        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public int pageSize { get; set; } = 6;
        public int pageIndex { get; set; } = 1;
    }
}
