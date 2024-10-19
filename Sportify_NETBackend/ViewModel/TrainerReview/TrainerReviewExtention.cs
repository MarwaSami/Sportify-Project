using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class TrainerReviewExtention
    {

        public static TrainerReview ToEntity(this TrainerReviewViewModel viewModel,string TrainerID)
        {
            return new TrainerReview
            {
                ID = viewModel.ID,
                UserID = viewModel.UserID,
                TrainerID = TrainerID,
                RateValue = viewModel.RateValue,
                Ratemsg = viewModel.Ratemsg,

            };
        }
        public static TrainerReviewViewModel ToModel(this TrainerReview entity)
        {
            return new TrainerReviewViewModel
            {
                ID = entity.ID,
                UserID = entity.UserID,
                RateValue = entity.RateValue,
                Ratemsg = entity.Ratemsg,
                UserName = entity.User.UserName,
                UserImg = entity.User.ProfileImg
            };
        }
    }
}
