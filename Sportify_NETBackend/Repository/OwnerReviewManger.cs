using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repository
{
    public class OwnerReviewManager : MainManager<OwnerReview>
    {
        private readonly SportfiyContext _context;
        private BookingManager bookingManager;
        public OwnerReviewManager(SportfiyContext context,BookingManager _bookingManager) : base(context)
        {
            _context = context;
            bookingManager = _bookingManager;
        }

        public string AddReview(OwnerAddReviewModel viewModel)
        {
            var book=bookingManager.GetAll().Where(B=>B.ID==viewModel.BookingID).FirstOrDefault();
            if(book!=null)
            {
            viewModel.UserID=book.UserID;
            var model = viewModel.ToEntity(book.PlaceID);
            var result = Add(model);
            return "Successfully Added";
            }
            else
            {
                return "Booking is not exist";
            }
        }
        public string UpdateReview(OwnerAddReviewModel viewModel)
        {
            var book = bookingManager.GetAll().Where(B => B.ID == viewModel.BookingID).FirstOrDefault();
            if (book != null)
            {
                viewModel.UserID = book.UserID;
                var model = viewModel.ToEntity(book.PlaceID);
                var result = Update(model);
                return "Successfully Updated";
            }
            else
            {
                return "Booking is not exist";
            }
        }

        public List<OwnerReviewViewModel> GetReview(int placeId,string trainerId)
        {
            var reviews = FilterBY(a => a.PlaceID == placeId && a.UserID == trainerId,nameof(OwnerReview.ID),true).ToList();
            var reviewModels = reviews.Select(s =>s.ToModel()).ToList();
            return reviewModels;
        }

        public List<PlaceHomeReviewViewModel> GetFirstThreeReview()
        {
            return GetAll().Take(3).Select(R => R.ToHomeView()).ToList();
        }
        public int AverageReview(int placeId,string trainerId)
        {
            var reviews = FilterBY(a => a.PlaceID == placeId && a.UserID == trainerId,nameof(OwnerReview.ID),true).Select(s=>s.RateValue).ToList();
            var rates = reviews.Sum() / reviews.Count();
            return rates;
        }




    }
}