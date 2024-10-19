using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repository
{
    public class FacilityManager : MainManager<Facility>
    {
        public FacilityManager(SportfiyContext db) : base(db) { }

        public List<FacilityViewModel> GetAllFacility()
        {
            return GetAll().Select(F => F.ToFilterView()).ToList();
        }
        public void AddFacility(AddFacilityViewModel facility)
        {
            Add(facility.ToAddModel());
        }
    }
}
