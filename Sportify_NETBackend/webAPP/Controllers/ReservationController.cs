using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System.Security.Claims;
using System.Text;
using ViewModel;

namespace webAPP.Controllers
{
    public class ReservationController : ControllerBase
    {
        TrainerBookingManager ReservationManager;
        UnitOfWork unitOfWork;
        public ReservationController(TrainerBookingManager ReservationManager, UnitOfWork _unitOfWork)
        {
            this.ReservationManager = ReservationManager;
            this.unitOfWork = _unitOfWork;
        }
        [Authorize(Roles ="Trainer")]
        public IActionResult GetOwnerBooking(List<Models.Status> status)
        {
            string user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (user == null)
            {
                return new JsonResult(
                    new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not found",
                        status = 404
                    }
                    );
            }
            else if (status == null)
            {
                return new JsonResult(
                  new APIResult<string>
                  {
                      data = "",
                      IsSuccceed = false,
                      message = "Status is not exist",
                      status = 404
                  }
                  );
            }
            else
            {
                return new JsonResult(new APIResult<List<TrainerUserListViewModel>>
                {
                    data = ReservationManager.GetTrainerBookingBasedonStatus(status,user),
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }

        }
        [Authorize(Roles = "Trainer")]
        public IActionResult GetAllBooking(int pageSize=6,int pageIndex=1)
        {
            string user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (user == null)
            {
                return new JsonResult(
                    new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not found",
                        status = 404
                    }
                    );
            }
            else
            {
                return new JsonResult(new APIResult<PaginationViewModel<TrainerUserListViewModel>>
                {
                    data = ReservationManager.GetAllBooking(user,pageSize,pageIndex),
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }

        }
        [Authorize(Roles = "Trainer")]
        [Authorize, HttpPost]
        public IActionResult BookingFilterBY([FromBody] ReservationFilterViewModel viewModel)
        {
            if (viewModel == null)
            {
                return new JsonResult(
                   new APIResult<string>
                   {
                       data = "",
                       IsSuccceed = false,
                       message = "User is Not found",
                       status = 404
                   }
                   );
            }
            else
            {
                return new JsonResult(
                   new APIResult<PaginationViewModel<TrainerUserListViewModel>>
                   {
                       data = ReservationManager.FilterBy(viewModel),
                       IsSuccceed = false,
                       message = "User is Not found",
                       status = 404
                   }
                   );
            }
        }
        [Authorize,HttpPost]
        public IActionResult GetBookingBasedonStatus([FromBody]List<Models.Status> status)
        {
            string user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (user == null )
            {
                return new JsonResult(
                    new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not found",
                        status = 404
                    }
                    );
            }
            else if (status == null)
            {
                return new JsonResult(
                    new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "you must add booking status",
                        status = 404
                    }
                    );
            }
            else
            {
                var data = ReservationManager.GetBookingBasedonStatus(status, user);
                return new JsonResult(new APIResult<List<TrainerUserListViewModel>>
                {
                    data =data,
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }
        }
       
     
    }
}
