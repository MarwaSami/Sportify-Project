using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ViewModel
{
    public class BookingViewModel
    {
        public int ID { get; set; } = 0;
        public int StartTime { get; set; }
        public int EndTime { get; set; }
        public float TotalPrice { get; set; }
        public int Code { get; set; }
        public int Count { get; set; }
        public string? UserID { set; get; }
        public int PlaceID { set; get; }
        public int TypeID { get; set; } = 1;
        public BookingStatus Status { get; set; } = BookingStatus.Pending;
        public DateTime Date { get; set; }=DateTime.Now;
 
    }
}
