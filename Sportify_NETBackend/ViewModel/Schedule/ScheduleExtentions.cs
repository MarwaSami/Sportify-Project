using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace ViewModel
{
    public static class ScheduleExtentions
    {
        public static Schedule ToModel(this AddScheduleViewModel model)
        {

            return new Schedule()
            {
                Day = model.Day,
                StartTime = model.StartTime,
                EndTime = model.EndTime,

            };
        }
        public static ScheduleViewModel ToVeiwModel(this Schedule model)
        {
            return new ScheduleViewModel
            {
                ID = model.ID,
                PlaceId = model.PlaceId,
                Day = model.Day,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
            };
        }
        public static AddScheduleViewModel ToAddViewModel(this Schedule model)
        {
            return new AddScheduleViewModel
            {
                ID = model.ID,
                PlaceId = model.PlaceId,
                Day = model.Day,
                StartTime = model.StartTime,
                EndTime = model.EndTime,
            };
        }
        public static Schedule ToModel(this ScheduleViewModel scheduleViewModel)
        {
            return new Schedule
            {
                ID = scheduleViewModel.ID,
                PlaceId = scheduleViewModel.PlaceId,
                Day = scheduleViewModel.Day,
                StartTime = scheduleViewModel.StartTime,
                EndTime = scheduleViewModel.EndTime,
            };
        }
        
    }
}
