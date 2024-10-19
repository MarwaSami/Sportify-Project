using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class BookingExtention
    {

        public static Booking ToModel(this BookingViewModel viewModel)
        {
            DateTime start = new DateTime(viewModel.Date.Year, viewModel.Date.Month, viewModel.Date.Day, viewModel.StartTime, 0, 0);
            DateTime end = new DateTime(viewModel.Date.Year, viewModel.Date.Month, viewModel.Date.Day, viewModel.EndTime, 0, 0);
            return new Booking
            {
                ID = viewModel.ID,
                StartTime = start,
                EndTime = end,
                TotalPrice = viewModel.TotalPrice,
                Code = viewModel.Code,
                Count = viewModel.Count,
                UserID = viewModel.UserID,
                PlaceID = viewModel.PlaceID,
                Status = viewModel.Status,
            };
        }
        public static CustomerBookingViewModel ToviewModel(this Booking booking)
        {
            var reviews = booking.Place.OwnerReviews.Where(R => R.PlaceID == booking.PlaceID && R.UserID == booking.UserID).ToList();
            bool isreviewed = false;
            int reivewid = 0;
            if (reviews.Count > 0)
            {
                isreviewed = true;
                reivewid = reviews.Select(R => R.ID).ToList().FirstOrDefault();
            }
            return new CustomerBookingViewModel()
            {
                PlaceName = booking.Place.Name,
                ReservitionId = booking.ID,
                TotalPrice = booking.TotalPrice,
                ReservitionDate = booking.StartTime.ToShortDateString(),
                ReservitionTime = booking.StartTime.ToShortTimeString(),
                ReservitionEndTime = booking.EndTime.ToShortTimeString(),
                ReservitionStatus = booking.Status,
                IsReviewed = isreviewed,
                ReviewID = reivewid

            };
        }
        public static SeeBooking ToOwnerViewModel(this Booking booking)
        {
            return new SeeBooking()
            {
                ID = booking.ID,
                StartTime = booking.StartTime.ToShortTimeString(),
                EndTime = booking.EndTime.ToShortTimeString(),
                TotalPrice = booking.TotalPrice,
                Count = booking.Count,
                UserName = booking.User.UserName,
                PlaceName = booking.Place.Name,
                ReservationDate = new DateOnly(booking.StartTime.Year, booking.StartTime.Month, booking.StartTime.Day),
                Status = booking.Status,
            };
        }
        public static void getSechuleDate(this DateTime Date, DateTime start, DateTime end)
        {
            TimeSpan diff = Date.Subtract(start);
            start.AddDays(diff.Days);
            end.AddDays(diff.Days);
        }
    }
}
