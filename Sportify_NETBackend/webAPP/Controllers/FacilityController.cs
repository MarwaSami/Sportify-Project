using Microsoft.AspNetCore.Mvc;
using Repository;
using ViewModel;

namespace webAPP
{
    public class FacilityController : ControllerBase
    {
        FacilityManager facilityManager;
        public FacilityController(FacilityManager _facilityManager)
        {
            this.facilityManager = _facilityManager;
        }
        public IActionResult Index()
        {
            return new JsonResult(new APIResult<List<FacilityViewModel>>()
            {
                data = facilityManager.GetAllFacility(),
                IsSuccceed = true,
                message = "You successfully get all facility",
                status = 200
            });
        }
    }
}
