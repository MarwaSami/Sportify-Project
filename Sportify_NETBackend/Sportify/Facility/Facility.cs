using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Facility
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<FacilityPlace> FacilityPlaces { get; set; }
        public string ModificationBy { get; set; }
        public DateTime ModificationDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}

