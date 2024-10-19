using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class OwnerReviewExtention
    {

        public static OwnerReview ToEntity(this OwnerAddReviewModel viewModel,int PlaceID)
        {
            return new OwnerReview
            {
                ID=viewModel.ID,
                UserID = viewModel.UserID,
                PlaceID =PlaceID,
                RateValue = viewModel.RateValue,
                RateMsg = viewModel.RateMsg,
            };
        }
        public static OwnerReviewViewModel ToModel(this OwnerReview entity)
        {
            return new OwnerReviewViewModel
            {
                ID = entity.ID,
                UserID = entity.UserID,
                PlaceID = entity.PlaceID,
                RateValue = entity.RateValue,
                RateMsg = entity.RateMsg,
                User = entity.User.ToModel(),
                Place=entity.place.ToModel()
            };
        }
        public static PlaceHomeReviewViewModel ToHomeView(this OwnerReview entity)
        {
            return new PlaceHomeReviewViewModel
            {
                ID = entity.ID,
                UserName = entity.User.UserName,
                UserImg = entity.User.ProfileImg,
                RateValue = entity.RateValue,
                RateMsg = entity.RateMsg,
                PlaceName = entity.place.Name,
            };
        }

    }
}
