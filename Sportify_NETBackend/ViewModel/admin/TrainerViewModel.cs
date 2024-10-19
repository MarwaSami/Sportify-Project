using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class TrainerViewModel
    {
        public string ID { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string CategoryName { get; set; }
        public string ProfileImage { get; set; }
        public int CategoryID { get; set; }
        public string SurfaceName { get; set; }
        public int SurfaceID { get; set; }
    }
}
