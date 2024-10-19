using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using ViewModel;


namespace ViewModel
{
    public static class TrainerExtention
    {

        public static Models.User ToModel(this UpdateProfileViewModel viewModel, Models.User oldmodel)
        {

            oldmodel.Id = viewModel.ID;
            oldmodel.JobTitle = viewModel.JobTitle != oldmodel.JobTitle && viewModel.JobTitle != null ? viewModel.JobTitle : oldmodel.JobTitle;
            oldmodel.Description = viewModel.Description != oldmodel.Description && viewModel.Description != null ? viewModel.Description : oldmodel.Description;
            oldmodel.UserName = viewModel.UserName != oldmodel.UserName && viewModel.UserName != null ? viewModel.UserName : oldmodel.UserName;
            oldmodel.Email = viewModel.Email != oldmodel.Email && viewModel.Email != null ? viewModel.Email : oldmodel.Email;
            oldmodel.PhoneNumber = viewModel.PhoneNumber != oldmodel.PhoneNumber && viewModel.PhoneNumber != null ? viewModel.PhoneNumber : oldmodel.PhoneNumber;
            oldmodel.CategoryID = viewModel.CategoryID != oldmodel.CategoryID && viewModel.CategoryID != null ? viewModel.CategoryID : oldmodel.CategoryID;
            oldmodel.Location = viewModel.City != oldmodel.Location && viewModel.City != null ? viewModel.City : oldmodel.Location;
            oldmodel.SurfaceID = viewModel.SurfaceID != oldmodel.SurfaceID && viewModel.SurfaceID != null ? viewModel.SurfaceID : oldmodel.SurfaceID;
            oldmodel.PricePerSession = viewModel.PricePerSession != oldmodel.PricePerSession && viewModel.PricePerSession != null ? viewModel.PricePerSession : oldmodel.PricePerSession;
            oldmodel.ProfileImg = viewModel.ProfileImageUrl != oldmodel.ProfileImg && viewModel.ProfileImageUrl != null ? viewModel.ProfileImageUrl : oldmodel.ProfileImg;

            return oldmodel;
        }

        public static List<TrainerSchedule> ToAddModel(this SetScheduleViewModel viewModel)
        {
            List<TrainerSchedule> schedules = new List<TrainerSchedule>();
            for (int index = 0; index < viewModel.Day.Count; index++)
            {
                schedules.Add(new TrainerSchedule()
                {
                    Day = viewModel.Day.ElementAt(index),
                    StartTime = viewModel.StartTime.ElementAt(index),
                    EndTime = viewModel.EndTime.ElementAt(index),
                });

            }
            return schedules;
        }
        public static getScheduleViewModel ToViewScheduleModel(this List<TrainerSchedule> viewModel)
        {
            getScheduleViewModel schedules = new getScheduleViewModel();
            schedules.Day = new List<string>();
            schedules.StartTime = new List<DateTime>();
            schedules.EndTime = new List<DateTime>();
            for (int index = 0; index < viewModel.Count; index++)
            {
                schedules.Day.Add(viewModel.ElementAt(index).Day);
                schedules.StartTime.Add(viewModel.ElementAt(index).StartTime);
                schedules.EndTime.Add(viewModel.ElementAt(index).EndTime);
            }
            return schedules;
        }
        public static ICollection<TrainerSchedule> ToUpdateModel(this ICollection<TrainerSchedule> oldSchedules, List<TrainerSchedule>
      newSchedules)
        {
            for (int index = 0; index < oldSchedules.Count; index++)
            {
                oldSchedules.ElementAt(index).StartTime = newSchedules[index].StartTime;
                oldSchedules.ElementAt(index).EndTime = newSchedules[index].EndTime;
                oldSchedules.ElementAt(index).Day = newSchedules[index].Day;
            }
            return oldSchedules;
        }
        public static TrainerSchedule ToModel(this SetScheduleDayViewModel viewModel)
        {
            return new TrainerSchedule
            {
                Day = viewModel.Day,
                StartTime = viewModel.StartTime,
                EndTime = viewModel.EndTime,
            };
        }

        public static TrainerCardViewModel ToViewModel(this Models.User trainer)
        {
            var schedule = new List<SetScheduleDayViewModel>();
            foreach (var item in trainer.TrainerSchedules)
            {
                schedule.Add(new SetScheduleDayViewModel()
                {
                    Day = item.Day,
                    EndTime = item.EndTime,
                    StartTime = item.StartTime,
                });
            }
            return new TrainerCardViewModel
            {
                Id = trainer.Id,
                Adress = trainer.Location,
                CategoryName = trainer.Category == null ? "Not Selected Yet" : trainer!.Category!.Name,
                UserName = trainer!.UserName!,
                PricePerSession = trainer.PricePerSession == null ? 1 : trainer!.PricePerSession!,
                Image = trainer.ProfileImg,
                Surface = trainer!.Surface! == null ? "Not Selected Yet" : trainer!.Surface!.Name,
                JobTitle = trainer.JobTitle,
                Description = trainer.Description,
                WorkingHours = schedule,

            };
        }

        public static UpdateProfileViewModel ToUpdateViewModel(this Models.User Model)
        {
            return new UpdateProfileViewModel
            {
                ID = Model.Id,
                CategoryID = Model.CategoryID,
                City = Model.Location,
                Email = Model.Email,
                PhoneNumber = Model.PhoneNumber,
                PricePerSession = Model.PricePerSession,
                SurfaceID = Model.SurfaceID,
                UserName = Model.UserName,
                Description = Model.Description,
                JobTitle = Model.JobTitle,

            };
        }
        //GetTrainerBookingList

        public static TrainerUserListViewModel ToModel(this UserTrainer Customer)
        {
            return new TrainerUserListViewModel
            {
                UserName = Customer.User.UserName,
                Id = Customer.ID,
                EndTime = Customer.EndTime,
                StartTime = Customer.StartTime,
                Price = Customer.TotalPrice,
                Status = Customer.Status,
                OrderDate = Customer.StartTime,
                TrainerName = Customer.Trainer.UserName

            };
        }
        //Get avg Rate
        public static float GetTrainerAvgRate(this User user)
        {
            float RateValuesum = 0;
            foreach (var item in user.TReviews.Select(R => R.RateValue).ToList())
            {
                RateValuesum += item;
            }
            if (user.TReviews.Select(R => R.RateValue).ToList().Count != 0)
                return RateValuesum / user.TReviews.Select(R => R.RateValue).ToList().Count;
            else
                return 0;
        }
        public static bool GetAvailableTrainer(this User user, DateTime AvaibleTime)
        {
            var TrainerSchedule = user.TrainerSchedules.ToList();
            foreach (var Tsch in TrainerSchedule)
            {
                var incomeday = AvaibleTime.DayOfWeek.ToString().ToLower();
                if (Tsch.Day.ToLower() == incomeday)
                {
                    if (Tsch.EndTime.Hour >= AvaibleTime.Hour && (Tsch.EndTime.Hour - Tsch.StartTime.Hour) > 1)
                    {
                        return true;
                    }
                }
                else
                {
                    continue;
                }
            }
            return false;
        }


    }
}
