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
    public class TrainerReviewManager : MainManager<TrainerReview>
    {
        private readonly SportfiyContext _context;
        private TrainerBookingManager bookingManager;
        public TrainerReviewManager(SportfiyContext context, TrainerBookingManager _bookingManager) : base(context)
        {
            _context = context;
            this.bookingManager = _bookingManager;
        }

        //AddReview
        public string AddReview(TrainerReviewViewModel viewModel)
        {
            var book = bookingManager.GetAll().Where(B => B.ID == viewModel.BookingID && B.UserId == viewModel.UserID).FirstOrDefault();
            if (book != null)
            {
                var model = viewModel.ToEntity(book.TrainerId);
                var result = Add(model);
                
                return "Successfully Added";
            }
            else
            {
                return "Booking is not exist";
            }
        }
        public string UpdateReview(TrainerReviewViewModel viewModel)
        {
            var book = bookingManager.GetAll().Where(B => B.ID == viewModel.BookingID && B.UserId == viewModel.UserID).FirstOrDefault();
            if (book != null && viewModel.ID!=0)
            {
                var model = viewModel.ToEntity(book.TrainerId);
                var result = Update(model);
                return "Successfully Updated";
            }
            else
            {
                return "Booking is not exist";
            }
        }

        public List<TrainerReviewViewModel> GetReview( string trainerId)
        {
            var reviews = FilterBY(a => a.TrainerID == trainerId, nameof(TrainerReview.UserID), true).ToList();
            var reviewModels = reviews.Select(s => s.ToModel()).ToList();
            return reviewModels;
        }

        public int AverageReview(string userID, string trainerId)
        {
            var reviews = FilterBY(a => a.UserID == userID && a.TrainerID == trainerId, nameof(TrainerReview.UserID), true).Select(s => s.RateValue).ToList();
            var rates = reviews.Sum() / reviews.Count();
            return rates;
        }
    }
}