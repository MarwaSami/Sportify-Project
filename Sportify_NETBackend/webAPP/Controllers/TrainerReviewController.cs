using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Repository;
using System.Security.Claims;
using System.Text;
using ViewModel;

namespace webAPP.Controllers
{
    public class TrainerReviewController : ControllerBase
    {
        TrainerReviewManager trainerReviewManager;
        public TrainerReviewController(TrainerReviewManager trainerReviewManager)
        {
            this.trainerReviewManager = trainerReviewManager;
        }
        public IActionResult AddReview([FromBody] TrainerReviewViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                trainerReviewManager.AddReview(viewModel);
                return new JsonResult("Review Successfuly");
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
        //Get All review
        [Authorize(Roles = "Trainer")]
        [HttpGet]
        public IActionResult GetReviewForTrainer()
        {
            
            var trainerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var reviews = trainerReviewManager.GetReview(trainerID); 
            return new JsonResult(new APIResult<List<TrainerReviewViewModel>>
            {
                data = reviews,
                status = 200,
                IsSuccceed = true,
                message="Done"
            });
        }



      
        //public IActionResult GetReview(string userId, string trainerId)
        //{
        //    var reviews = trainerReviewManager.GetReview(userId, trainerId);
        //    return new JsonResult(reviews);

        //}

        public IActionResult AverageReview(string userId, string trainerId)
        {
            var reviews = trainerReviewManager.AverageReview(userId, trainerId);
            return new JsonResult(reviews);

        }


    }
}
