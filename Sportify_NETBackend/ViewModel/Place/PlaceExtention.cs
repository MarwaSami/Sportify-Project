using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class PlaceExtention
    {

        
        public static PlaceViewModel ToModel(this Models.Place entity)
        {
            return new PlaceViewModel
            {
                ID = entity.ID,
                Description=entity.Description,
                Name = entity.Name
              
            };
        }

        //Review view Model
        public static PlaceReviewViewModel ToPlaceVModal(this OwnerReview entity)
        {
            return new PlaceReviewViewModel
            {
                ID = entity.ID,
                UserID = entity.UserID,
                PlaceID = entity.UserID,
                RateValue = entity.RateValue,
                Ratemsg = entity.RateMsg,
                UserName = entity.User.UserName,
                UserImg = entity.User.ProfileImg
            };
        }

    }
}
