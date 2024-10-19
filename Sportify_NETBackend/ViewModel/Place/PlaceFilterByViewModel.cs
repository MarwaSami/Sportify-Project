using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class PlaceFilterByViewModel
    {
        //  Order by 
        public string OrderBy { get; set; } = "ID";
        public bool IsAscending { get; set; } = false;
        // Pegination
        public int pageSize { get; set; } = 8;
        public int pageIndex { get; set; } = 1;
        // Category
        public List<int> CategoryID { get; set; } = new List<int>();
        // Customer Rate
        public List<int> RateValue { get; set; } = new List<int>();
        //Location : Near you
        public double d { get; set; } = 0;
        public double Lang { get; set; } =0;
        public double Lat { get; set; } = 0;
        // Location : City
        public List<string> City { get; set; } = new List<string>();
        //Number suppose remain capacity
        public List<int> Capacity { get; set; } = new List<int>();
        // by Surface ,type
        public List<int> TypeID { get; set; } = new List<int>();
        public List<int> SurfaceID { get; set; } = new List<int>();
        // Facility
        public List<int> FacilityID { get; set; } = new List<int>();
    }
}
