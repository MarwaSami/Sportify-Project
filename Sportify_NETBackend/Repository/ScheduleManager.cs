using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repository
{
    public class ScheduleManager : MainManager<Schedule>
    {
        private readonly SportfiyContext mydB;
        private PlaceManager placeManager;
        public ScheduleManager(SportfiyContext _mydB, PlaceManager _placeManager) : base(_mydB)
        {
            mydB = _mydB;
            placeManager = _placeManager;
        }
        public void GetOneById(int id)
        {
            GetAll().Where(i => i.ID == id).FirstOrDefault();
        }
        public EntityEntry Delete(int id)
        {
            var result = Remove(GetAll().Where(i => i.ID == id).FirstOrDefault());
            return result;
        }
        public void Add(AddScheduleViewModel viewModel)
        {
            Schedule schedule = viewModel.ToModel();
            Add(schedule);
        }
        public List<ScheduleDetailViewModel> GetAvaiblePlaceAttime(int id)
        {
            // step1 : insert list of schuldedetailviewModel
            Place place = placeManager.GetbyId(id);
            if (place != null)
            {
                List<ScheduleDetailViewModel> sch = new List<ScheduleDetailViewModel>();
                // step2:   get Schedule PerDay
                var List = place.Schedules.Select(S => S.ToVeiwModel()).ToList();
                foreach (var Sch in List)
                {
                    var temp = GetSchedulePerDay(place.Bookings.Where(B => B.Status!=BookingStatus.Rejected||B.Status!=BookingStatus.Completed).Select(B => new BookingSelectViewModel()
                    {
                        Count = B.Count,
                        StartTime = B.StartTime,
                        EndTime=B.EndTime,
                        Status = B.Status,
                    }).ToList(), place.Capacity, Sch.StartTime, Sch.EndTime, Sch.Day);
                    sch.Add(temp);
                }
                return sch;
            }
            else
            {
                return null;
            }
        }
        public ScheduleDetailViewModel GetSchedulePerDay(List<BookingSelectViewModel> bookings, int totalcapacity, DateTime startTime, DateTime endTime
            , string Day)
        {
            // GetDayof week and date
            ScheduleDetailViewModel viewModel = new ScheduleDetailViewModel();
            List<SchedulePerHour> schedulePerHours = new List<SchedulePerHour>();
            viewModel.dayofWeek = Day;
            viewModel.date = getCurrentDateofWeek(Day);
            // getTime diff if more than one hour is there is schedule
            TimeSpan Timediff = endTime - startTime;
            if (Timediff.Hours >= 1)
            {
                // GetHours 
                var Hours = GetHoursinWorkingDay(startTime, Timediff.Hours);
                foreach (var hour in Hours)
                {
                    schedulePerHours.Add(getSchedulePerHour(bookings, totalcapacity, hour, viewModel.date));
                }
                viewModel.IsWorking = true;
            }
            else
            {
                viewModel.IsWorking = false;
            }
            viewModel.schedule = schedulePerHours;
            return viewModel;
        }
        public int TargetDayOfweek(string Day)
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
        public DateOnly getCurrentDateofWeek(string Day)
        {
            DateOnly currentDate = new DateOnly(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
            int targetDayOfWeek = TargetDayOfweek(Day); // Change to your desired day of the week
            int daysUntilNextOccurrence = (targetDayOfWeek - (int)currentDate.DayOfWeek + 7) % 7;
            return currentDate.AddDays(daysUntilNextOccurrence);
        }
        public List<int> GetHoursinWorkingDay(DateTime startTime, int hours)
        {
            List<int> result = new List<int>();
            int i = 0;
            while (i < hours)
            {
                result.Add(startTime.AddHours(i).Hour);
                i++;
            }
            return result;
        }
        public SchedulePerHour getSchedulePerHour(List<BookingSelectViewModel> bookings, int totalcapacity, int startPerHour, DateOnly date)
        {
            // date and hour
            DateTime FulldateFor = new DateTime(date.Year, date.Month, date.Day, startPerHour, 0, 0);
            int CurrentCapacity = GetCurrentCapacityForPlace(bookings, totalcapacity, FulldateFor);
            SchedulePerHour schedulePerHour = new SchedulePerHour();
            schedulePerHour.period = startPerHour;
            schedulePerHour.duration = 1;
            schedulePerHour.capacity = CurrentCapacity;
            if (CurrentCapacity > 0)
            {
                if (CurrentCapacity == totalcapacity)
                {
                    schedulePerHour.status = SchStatus.Available;
                }
                else
                {
                    schedulePerHour.status = SchStatus.SemiAvailable;
                }
            }
            else
            {
                schedulePerHour.status = SchStatus.Booked;
            }
            return schedulePerHour;
        }
        public int GetCurrentCapacityForPlace(List<BookingSelectViewModel> bookings, int totalcapacity, DateTime date)
        {
            int CurrentCapacity = totalcapacity;

            if (bookings.Count > 0)
            {
                foreach (var book in bookings)
                {
                    TimeSpan Timediff = book.EndTime - book.StartTime;
                    List<int> bookingHour = GetHoursinWorkingDay(book.StartTime, Timediff.Hours);
                    foreach (var hour in bookingHour)
                    {

                        if (hour == date.Hour && book.StartTime.Date == date.Date && (book.Status == BookingStatus.Pending || book.Status == BookingStatus.Confirmed))
                        {
                            CurrentCapacity -= book.Count;
                        }
                    }


                }
            }
            else
            {
                CurrentCapacity = totalcapacity;
            }
            return CurrentCapacity;
        }
    }
}
