using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class FacilityModelLogic
    {
        public static FacilityViewModel ToFilterView(this Facility facility)
        {
            return new FacilityViewModel()
            {
                Id = facility.ID,
                Name = facility.Name
            };
        }
        public static Facility ToAddModel(this AddFacilityViewModel facility)
        {
            return new Facility()
            {
                ID = facility.Id,
                Name = facility.Name,
                ModificationBy = facility.ModificationBy,
                ModificationDate=facility.ModificationDate,
            };
        }
    }
}
