using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System.Security.Claims;
using ViewModel;
namespace webAPP.Controllers
{
    public class PreferredSportsController : ControllerBase
    {
        private PreferredSportsManger manger;
        private UnitOfWork unitofwork;
        public PreferredSportsController(PreferredSportsManger sportsManger, UnitOfWork _unitOfWork)
        {
            manger = sportsManger;
            unitofwork = _unitOfWork;
        }
        [Authorize]
        public IActionResult Get()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res =  manger.GetByUser(id);

            return new  JsonResult(res);
        }
        [Authorize]
        public IActionResult Remove(int id)
        {
            var Userid = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = manger.Remove(Userid, id);
            return new JsonResult(res);
        }
        [Authorize]
        public IActionResult Add(int id) {
            var Userid = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var res = manger.Add(Userid,id);

            return new JsonResult(res);
        }

    }
}
