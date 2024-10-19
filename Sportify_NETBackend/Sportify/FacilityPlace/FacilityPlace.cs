using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class FacilityPlace
    {
        public int ID { get; set; }
        public virtual Facility Facility { get; set; }
        public int FacilityID { get; set; }
        public virtual Place Place { get; set; }
        public int PlaceID { get; set; }
    }

}