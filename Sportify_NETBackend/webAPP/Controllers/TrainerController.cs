using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using Services;
using System.Security.Claims;
using System.Text;
using ViewModel;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webAPP.Controllers
{
    public class TrainerController : ControllerBase
    {
        private TrainerManager trainerManager;
        private TrainerBookingManager bookingManager;
        private TrainerReviewManager reviewManager;
        private UnitOfWork unitOfWork;
        public TrainerController(
            TrainerBookingManager _bookingManager, TrainerManager _trainerManager,TrainerReviewManager _reviewManager, UnitOfWork _unitOfWork)
        {
            trainerManager = _trainerManager;
            unitOfWork = _unitOfWork;
            bookingManager = _bookingManager;
            reviewManager = _reviewManager;
        }

        #region Trianer Profile
        [HttpPost("UpdateProfileData")]
        [Authorize(Roles = "Trainer")]
        public IActionResult UpdateProfileData([FromBody] UpdateProfileViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                string userID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var existingProfile = trainerManager.GetTrainerProfile(userID);
                existingProfile.City = viewModel.City ?? existingProfile.City;
                existingProfile.PhoneNumber = viewModel.PhoneNumber ?? existingProfile.PhoneNumber;

                if (existingProfile.UserName != viewModel.UserName)
                {
                    existingProfile.UserName = viewModel.UserName;
                    //existingProfile.NormalizedUserName = viewModel.UserName.ToUpper();
                }
                if (existingProfile.Email != viewModel.Email)
                {
                    existingProfile.Email = viewModel.Email;
                    //existingProfile.NormalizeEmail = viewModel.Email.ToUpper();
                }

                if (!string.IsNullOrEmpty(viewModel.NewPassword))
                {
                    //existingProfile.CurrentPassword = viewModel.CurrentPassword ?? existingProfile.CurrentPassword;
                    //existingProfile.NewPassword = viewModel.NewPassword ?? existingProfile.NewPassword;

                }
                trainerManager.UpdateProfileData(existingProfile);
                return Ok();
            }
            return BadRequest(ModelState);
        }
        [HttpGet]
        [Authorize(Roles = "Trainer")]
        #region Scheudle
        // Get ,set,Update Schedulde
        public async Task<IActionResult> GetSchedule()
        {
            SetScheduleViewModel viewModel = new SetScheduleViewModel();
            var user = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var result = await trainerManager.getSchedule(user);
            if (result.Day != null)
            {
                return new JsonResult(new APIResult<getScheduleViewModel>
                {
                    data = result,
                    IsSuccceed = true,
                    message = "it is successfully get all data",
                    status = 200
                });
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = "there is an issue occur",
                    status = 400
                });
            }
        }

        [Authorize(Roles = "Trainer")]
        public async Task<IActionResult> SetSchedule(SetScheduleViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                viewModel.TrainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var result = await trainerManager.SetScheduleAsync(viewModel);
                if (result.Contains("Success"))
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = true,
                        message = result,
                        status = 200
                    });
                }
                else
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = result,
                        status = 400
                    });
                }
            }
            return BadRequest(ModelState);
        }
        [HttpPost, Authorize(Roles = "Trainer")]
        public async Task<IActionResult> UpdateSchedule(SetScheduleViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                viewModel.TrainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var result = await trainerManager.updateSchedule(viewModel);
                if (result.Contains("Success"))
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = true,
                        message = result,
                        status = 200
                    });
                }
                else
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = result,
                        status = 400
                    });
                }

            }
            else
            {
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = false,
                    message = "You must add Valid data",
                    status = 400
                });
            }
        }

        #endregion
        [HttpPut("UpdateTrainerProfile")]
        [Authorize(Roles = "Trainer")]
        public IActionResult UpdateTrainerProfile([FromForm] UpdateProfileViewModel viewModel)
        {
            viewModel.ID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (viewModel.ProfileImage != null)
            {
                viewModel.ProfileImageUrl = viewModel.ProfileImage.Uploadone();
            }
            var updatedTrainer = trainerManager.UpdateTrainerProfile(viewModel);
            if (updatedTrainer == null)
            {

                return NotFound();
            }

            return Ok(updatedTrainer);
        }

        [HttpGet("GetTrainerProfile")]
        [Authorize(Roles = "Trainer")]
        public IActionResult GetTrainerProfile()
        {

            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var trainer = trainerManager.DataToUpdateTrainerProfile(id);
            if (trainer == null)
            {
                return NotFound();
            }

            return Ok(trainer);
        } 
        #endregion

        //GEt booking list for trainer

        [HttpGet]
        [Authorize]
        public ActionResult GetTrainerBookingList(int pageSize=6,int pageIndex=1)
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(id != null)
            {
               var trainerlist = bookingManager.GetAllBooking(id,pageSize,pageIndex);
                //viewModel.UserId = UserID;
                if (trainerlist == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "Booking is Not exist",
                        status = 400
                    });
                }
                else
                {
                     
                    
                    return new JsonResult(new APIResult<PaginationViewModel<TrainerUserListViewModel>>
                    {
                        data = trainerlist,
                        IsSuccceed = true,
                        message = "Get All Booking",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = "User is Not exist",
                    status = 400
                });
            }
            
        }
        [HttpGet]
        [Authorize]
        public ActionResult GetTrainerLatestBooking()
        {
            var id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (id != null)
            {
                var trainerlist = bookingManager.GetTrainerLatestBooking(id);
                //viewModel.UserId = UserID;
                if (trainerlist == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "Booking is Not exist",
                        status = 400
                    });
                }
                else
                {


                    return new JsonResult(new APIResult<List<TrainerUserListViewModel>>
                    {
                        data = trainerlist,
                        IsSuccceed = true,
                        message = "Get All Booking",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = "User is Not exist",
                    status = 400
                });
            }

        }
        // Update Trainer Booking status by trainer
        [Authorize(Roles ="Trainer")]
        public IActionResult UpdateTBooking(Status status,int BookingID)
        {
            if (status != null)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserID == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not exist",
                        status = 400
                    });
                }
                else
                {
                    bookingManager.UpdateTrainerBookingStatus(UserID,BookingID, status);
                    unitOfWork.commit();
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = true,
                        message = "successfully update status",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = "ADD valid data",
                    status = 404
                });
            }
        }
        //Realted To Customer
        [HttpPost,Authorize(Roles ="Customer")]
        public IActionResult AddTBooking([FromBody]AddTrainerBookingViewModel model)
        {
            if (ModelState.IsValid)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                model.UserId=UserID;
                if (UserID == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not exist",
                        status = 400
                    });
                }
                else
                {
                    bookingManager.AddBooking(model);
                    unitOfWork.commit();
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = true,
                        message = "Add successfully",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = " invalid data",
                    status = 400
                });
            }
        }
        [Authorize,HttpPost]
        public IActionResult BookingFilterBY([FromBody] ReservationFilterViewModel viewModel)
        {
            var result=bookingManager.FilterBy(viewModel);
            return new JsonResult(new APIResult<PaginationViewModel<TrainerUserListViewModel>>()
            {
                data = result,
                message = "Successfully get",
                IsSuccceed = true,
                status=200
            });
        }
        [Authorize,HttpPost]
        public IActionResult GetCustomerTBooking([FromBody]List<Status> status)
        {
            if (status!=null)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserID == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not exist",
                        status = 400
                    });
                }
                else
                {
                    var result=bookingManager.GetCustomerBookingBasedOnstatus(UserID,status);
                    return new JsonResult(new APIResult<List<CustomerTainerBookingViewModel>>
                    {
                        data = result,
                        IsSuccceed = true,
                        message = "Add successfully",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = " invalid data",
                    status = 400
                });
            }
        }
        [Authorize]
        public IActionResult UpdateCustomerTBooking(Status status,int BookingId)
        {
            if (status != null && BookingId!=0)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserID == null)
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = false,
                        message = "User is Not exist",
                        status = 400
                    });
                }
                else
                {
                    bookingManager.UpdateCustomerBookingStatus(UserID,BookingId, status);
                    unitOfWork.commit();
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        IsSuccceed = true,
                        message = "Add successfully",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>
                {
                    data = "",
                    IsSuccceed = false,
                    message = "ADD valid data",
                    status = 404
                });
            }
        }
        [HttpPost]
        public IActionResult Filter([FromBody] TrainerFilterViewModel viewModel)
        {
            var trainers = trainerManager.FilterBy(viewModel);
            return new JsonResult(new APIResult<PaginationViewModel<TrainerCardViewModel>>()
            {
                data = trainers,
                IsSuccceed = true,
                message = "You successfully get Trainers",
                status = 200
            });
        }
        [HttpPost]
        public IActionResult Search([FromBody] TrainerSearchViewModel viewModel)
        {
            var trainers = trainerManager.SearchBY(viewModel);
            return new JsonResult(new APIResult<PaginationViewModel<TrainerCardViewModel>>()
            {
                data = trainers,
                IsSuccceed = true,
                message = "You successfully get Trainers",
                status = 200
            });
        }
         //GET trainer Cities
        public IActionResult TrainerCities()
        {
            var result = trainerManager.GetCities();
            return new JsonResult(new APIResult<List<string>>
            {
                data =result,
                IsSuccceed = true,
                message = "you sucessfully get all cities of places",
                status = 200
            });
        }
        [HttpPost,Authorize]
        public IActionResult AddReview([FromBody] TrainerReviewViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if(UserID != null)
                {
                viewModel.UserID=UserID;
                var result = reviewManager.AddReview(viewModel);
                unitOfWork.commit();
                if (result.ToLower().Contains("Success".ToLower()))
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        message = result,
                        IsSuccceed = true,
                        status = 200
                    });

                }
                else
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        message = result,
                        IsSuccceed = false,
                        status = 404
                    });
                }
                }
                     else
                    {
                        return new JsonResult(new APIResult<string>
                        {
                            data = "",
                            message = "User is not exist",
                            IsSuccceed = false,
                            status = 404
                        });
                    }
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
        [HttpPost,Authorize]
        public IActionResult UpdateReview([FromBody] TrainerReviewViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var UserID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (UserID != null)
                {
                    viewModel.UserID=UserID;
                    var result = reviewManager.UpdateReview(viewModel);
                    unitOfWork.commit();
                    if (result.ToLower().Contains("Success".ToLower()))
                    {
                        return new JsonResult(new APIResult<string>
                        {
                            data = "",
                            message = result,
                            IsSuccceed = true,
                            status = 200
                        });

                    }
                    else
                    {
                        return new JsonResult(new APIResult<string>
                        {
                            data = "",
                            message = result,
                            IsSuccceed = false,
                            status = 404
                        });
                    }
                }
                else
                {
                    return new JsonResult(new APIResult<string>
                    {
                        data = "",
                        message = "User is not exist",
                        IsSuccceed = false,
                        status = 404
                    });
                }
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
        // Get ALL Customer  for  Specific Trainer
        public int GetCustomerCount()
        {
            var TrainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (TrainerID != null)
            {
                int count=bookingManager.GetCustomerountForSpecificTrainers(TrainerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        public int GetBookingCount()
        {
            var TrainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (TrainerID != null)
            {
                int count = bookingManager.GetBookingCountForSpecificTrainers(TrainerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        public  int GetTotalEarning()
        {
            var TrainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (TrainerID != null)
            {
                int count = bookingManager.GetTotalEarningForSpecificTrainers(TrainerID);
                return count;
            }
            else
            {
                return 0;
            }
        }
        [HttpGet]
        public OwnerTrainerCount GetTrainerCount()
        {
            return new OwnerTrainerCount()
            {
                Customers = GetCustomerCount(),
                Bookings = GetBookingCount(),
                Earnings = GetTotalEarning()
            };
        }
    }

}