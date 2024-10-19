using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class TrainerFilterViewModel
    {
        //  Order by 
        public string OrderBy { get; set; } = "ID";
        public bool IsAscending { get; set; } = false;
        // Pegination
        public int pageSize { get; set; } = 6;
        public int pageIndex { get; set; } = 1;
        // Category
        public List<int> CategoryID { get; set; } = new List<int>();
        // Customer Rate
        public List<int> RateValue { get; set; } = new List<int>();
        // Location : City
        public List<string> City { get; set; } = new List<string>();
        public List<int> SurfaceID { get; set; } = new List<int>();

    }

}
