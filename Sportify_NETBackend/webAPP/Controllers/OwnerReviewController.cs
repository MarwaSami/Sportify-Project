using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System.Security.Claims;
using System.Text;
using ViewModel;

namespace webAPP.Controllers
{
    public class OwnerReviewController : ControllerBase
    {
        OwnerReviewManager ownerReviewManager;
        PlaceManager placeManager;
        UnitOfWork unitOfWork;
        public OwnerReviewController(OwnerReviewManager ownerReviewManager, UnitOfWork unitOfWork, PlaceManager placeManager)
        {
            this.ownerReviewManager = ownerReviewManager;
            this.unitOfWork = unitOfWork;
            this.placeManager = placeManager;
        }
        [HttpPost,Authorize]
        public IActionResult AddReview([FromBody] OwnerAddReviewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result =ownerReviewManager.AddReview(viewModel);
                unitOfWork.commit();
                if (result.ToLower().Contains("Success".ToLower()))
                {
                return new JsonResult(new APIResult<string>
                {
                    data="",
                    message=result,
                    IsSuccceed=true,
                    status=200
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
        [HttpPost, Authorize]
        public IActionResult UpdateReview([FromBody] OwnerAddReviewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result = ownerReviewManager.UpdateReview(viewModel);
                unitOfWork.commit();
                if (result.ToLower().Contains("Success"))
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
        public IActionResult GetReview(int placeId, string trainerId)
        {
            var reviews = ownerReviewManager.GetReview( placeId,  trainerId);
            return new JsonResult(reviews);
        }
        public IActionResult GetFirstThreeReview()
        {
            return new JsonResult(new APIResult<List<PlaceHomeReviewViewModel>>()
            {
                data = ownerReviewManager.GetFirstThreeReview(),
                message = "Get all data get successfully",
                IsSuccceed=true,
                status = 200

            });
        }
        public IActionResult AverageReview(int placeId, string trainerId)
        {
            var rate = ownerReviewManager.AverageReview(placeId, trainerId);
            return new JsonResult(rate);

        }

        //Get All review
        [Authorize(Roles = "Owner")]
        [HttpGet]
        public IActionResult GetReviewForTOwner(int placeId = 0)
        {

            var OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var reviews = placeManager.GetReviews(placeId, OwnerID);
            return new JsonResult(new APIResult<List<PlaceReviewViewModel>>
            {
                data = reviews,
                status = 200,
                IsSuccceed = true,
                message = "Done"
            });
        }

        

    }
}
