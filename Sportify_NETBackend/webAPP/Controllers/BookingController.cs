using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System.Security.Claims;
using System.Text;
using ViewModel;

namespace webAPP.Controllers
{
    public class BookingController : ControllerBase
    {
        BookingManager bookingManager;
        UnitOfWork unitOfWork;
        public BookingController(BookingManager bookingManager, UnitOfWork _unitOfWork)
        {
            this.bookingManager = bookingManager;
            this.unitOfWork = _unitOfWork;
        }
        [Authorize(Roles ="Owner")]
        public IActionResult GetOwnerBooking(List<BookingStatus> status)
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
                return new JsonResult(new APIResult<List<SeeBooking>>
                {
                    data = bookingManager.GetOwnerBookingBasedonStatus(status,user),
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }

        }
        [Authorize(Roles = "Owner")]
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
                return new JsonResult(new APIResult<PaginationViewModel<SeeBooking>>
                {
                    data = bookingManager.GetAllBooking(user,pageSize,pageIndex),
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }

        }
        [Authorize(Roles = "Owner")]
        public IActionResult GetLatestThreeBooking()
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
                return new JsonResult(new APIResult<List<SeeBooking>>
                {
                    data = bookingManager.GetLatestThreeBooking(user),
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }

        }
        [Authorize(Roles = "Owner")]
        [Authorize, HttpPost]
        public IActionResult BookingFilterBY([FromBody] BookingFilterViewModel viewModel)
        {
            string UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (viewModel == null || UserID=="")
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
                   new APIResult<PaginationViewModel<SeeBooking>>
                   {
                       data = bookingManager.FilterBy(viewModel,UserID),
                       IsSuccceed = true,
                       message = "successfully get all data",
                       status = 200
                   }
                   );
            }
        }
        [Authorize,HttpPost]
        public IActionResult GetBookingBasedonStatus([FromBody]List<BookingStatus> status)
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
                var data = bookingManager.GetBookingBasedonStatus(status, user);
                return new JsonResult(new APIResult<List<CustomerBookingViewModel>>
                {
                    data =data,
                    IsSuccceed = true,
                    message = "it is successfully added",
                    status = 200
                });
            }
        }
        [HttpPost]
        [Authorize]
        public IActionResult AddBooking([FromBody] BookingViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                viewModel.UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                bookingManager.AddBooking(viewModel);
                unitOfWork.commit();
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    message = "Successfully Booked",
                    IsSuccceed = true,
                    status = 200
                });
            }
            else
            {
                var str = new StringBuilder();
                foreach (var item in ModelState.Values)
                {
                    foreach (var item1 in item.Errors)
                    {
                        str.Append(item1.ErrorMessage);
                    }
                }

                return new JsonResult(str.ToString());
            }
        }
        [Authorize] // suppose no remove for booking
        public IActionResult RemoveBooking([FromBody] BookingViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                bookingManager.RemoveBooking(viewModel);
                return new JsonResult("Booking Remove Successfuly");
            }
            else
            {
                var str = new StringBuilder();
                foreach (var item in ModelState.Values)
                {
                    foreach (var item1 in item.Errors)
                    {
                        str.Append(item1.ErrorMessage);
                    }
                }

                return new JsonResult(str.ToString());
            }
        }
        [Authorize]
        public IActionResult UpdateBookingStatus(int bookingId=0,BookingStatus bookingStatus=BookingStatus.Pending)
        {
            if (bookingId>0)
            {
                var result = bookingManager.UpdateBookingStatus(bookingId, bookingStatus);
                unitOfWork.commit();

                if (result != null)
                {
                    return new JsonResult(new APIResult<string>()
                    {
                        data="",
                        message= "Booking Updated Successfully",
                        IsSuccceed=true,
                        status=200
                    });
                }
                else
                {
                    return new JsonResult(new APIResult<string>()
                    {
                        data = "",
                        message = "Booking is not found",
                        IsSuccceed = false,
                        status = 400
                    });
                }
            }
            else
            {
                var errors = new StringBuilder();
                foreach (var item in ModelState.Values)
                {
                    foreach (var error in item.Errors)
                    {
                        errors.Append(error.ErrorMessage);
                    }
                }

                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    message = errors.ToString(),
                    IsSuccceed = false,
                    status = 400
                });
            }
        }
        public int GetCustomerCount()
        {
            var OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (OwnerID != null)
            {
                int count = bookingManager.GetCustomerCountForSpecificOwner(OwnerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        public int GetBookingCount()
        {
            var OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (OwnerID != null)
            {
                int count = bookingManager.GetBookingCountForSpecificOwner(OwnerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        public float GetTotalEarning()
        {
            var OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (OwnerID != null)
            {
                float count = bookingManager.GetTotalEarningForSpecificCustomer(OwnerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        public OwnerTrainerCount GetALLOwnerCount() {
            return new OwnerTrainerCount()
            {
                Customers = GetCustomerCount(),
                Bookings = GetBookingCount(),
                Earnings = GetTotalEarning()
            };
        }
    }
}
