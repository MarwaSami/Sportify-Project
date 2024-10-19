using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class AddFacilityViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ModificationBy { get; set; } = "";
        public DateTime ModificationDate { get; set; } = DateTime.Now;
    }
}
