using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class TrainerViewModelLogic
    {
        public static CustomerTainerBookingViewModel ToCustomerViewModel(this UserTrainer book)
        {
            var reviews = book.Trainer.Reviews.Where(R => R.TrainerID == book.TrainerId && R.UserID == book.UserId).ToList();
            bool isreviewed = false;
            int reivewid = 0;
            if (reviews.Count > 0)
            {
                isreviewed = true;
                reivewid = reviews.Select(R=>R.ID).ToList().FirstOrDefault();
            }
            return new CustomerTainerBookingViewModel()
            {
                TrainerName = book.Trainer.UserName,
                ReservitionId = book.ID,
                TotalPrice = book.TotalPrice,
                ReservitionDate = book.StartTime.ToShortDateString(),
                ReservitionTime = book.StartTime.ToShortTimeString(),
                ReservitionEndTime = book.EndTime.ToShortTimeString(),
                ReservitionStatus = book.Status,
                IsReviewed = isreviewed,
                ReviewID = reivewid,
                PhoneNumber=book.Trainer.PhoneNumber
            };
        }
        public static UserTrainer ToAddModel( this AddTrainerBookingViewModel viewModel)
        {
            DateOnly date = getCurrentDateofWeek(viewModel.Day);
            DateTime start = new DateTime(date.Year, date.Month, date.Day,int.Parse(viewModel.StartTime.Split(':')[0]), int.Parse(viewModel.StartTime.Split(':')[1]), 0);
            DateTime end = new DateTime(date.Year, date.Month, date.Day, int.Parse(viewModel.EndTime.Split(':')[0]), int.Parse(viewModel.EndTime.Split(':')[1]), 0);
            return new UserTrainer()
            {
                TrainerId = viewModel.TrainerId,
                UserId = viewModel.UserId,
                StartTime = start,
                EndTime = end,
                TotalPrice = viewModel.TotalPrice,
                Status = viewModel.status
            };
        }
        public static int TargetDayOfweek(string Day)
        {
            int targetday = 0;
            switch (Day.ToLower())
            {

                case "sunday":
                    {
                        targetday = 0;
                    }
                    break;
                case "monday":
                    {
                        targetday = 1;
                    }
                    break;
                case "tuesday":
                    {
                        targetday = 2;
                    }
                    break;
                case "wednesday":
                    {
                        targetday = 3;
                    }
                    break;
                case "thursday":
                    {
                        targetday = 4;
                    }
                    break;
                case "friday":
                    {
                        targetday = 5;
                    }
                    break;
                case "saturday":
                    {
                        targetday = 6;
                    }
                    break;
            }
            return targetday;
        }
        public static DateOnly getCurrentDateofWeek(string Day)
        {
            DateOnly currentDate = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            int targetDayOfWeek = TargetDayOfweek(Day); // Change to your desired day of the week
            int daysUntilNextOccurrence = (targetDayOfWeek - (int)currentDate.DayOfWeek + 7) % 7;
            return currentDate.AddDays(daysUntilNextOccurrence);
        }
    }
}
