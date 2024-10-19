using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Repository
{
    public class BookingManager : MainManager<Booking>
    {
        private readonly SportfiyContext _mydB;
        private PlaceManager placeManager;

        public BookingManager(SportfiyContext mydB
            ,PlaceManager _placeManager) : base(mydB)
        {
            _mydB = mydB;
            placeManager = _placeManager;

        }
        public PaginationViewModel<SeeBooking> GetAllBooking(string UserId="",int pageSize=6,int pageIndex=1)
        {
            if(UserId == "") return null;
            else
            {
                var data = GetAll().Where(B => B.Place.OwnerID == UserId && B.Status != BookingStatus.Rejected);
                return new PaginationViewModel<SeeBooking>()
                {
                    data = Pageination(data,pageSize,pageIndex).Select(B => B.ToOwnerViewModel()).ToList(),
                    pageSize = pageSize,
                    pageIndex = pageIndex,
                    count = data.Count()

                };
            }
        }
        public List<SeeBooking> GetLatestThreeBooking(string UserId = "")
        {
            if (UserId == "") return null;
            else
            {
                var data = GetAll().Where(B => B.Place.OwnerID == UserId && B.Status != BookingStatus.Rejected).OrderBy("ID",false).Select(B => B.ToOwnerViewModel()).Take(3).ToList();
                return data;
            }
        }
        public List<CustomerBookingViewModel> GetBookingBasedonStatus(List<BookingStatus> status, string UserId = "")
        {
            if (UserId == "") return new List<CustomerBookingViewModel>();
            else
            {
                if(status.Count ==2)
                return GetAll().Where(B => B.UserID == UserId&& (B.Status == status[0] || B.Status == status[1])).Select(B => B.ToviewModel()).ToList();
                else
                return GetAll().Where(B => B.UserID == UserId && (B.Status == status[0])).Select(B => B.ToviewModel()).ToList();

            }
        }
        public List<SeeBooking> GetOwnerBookingBasedonStatus(List<BookingStatus> status, string UserId = "")
        {
            if (UserId == "") return new List<SeeBooking>();
            else
            {
                if (status.Count == 2)
                    return GetAll().Where(B => B.Place.OwnerID == UserId && (B.Status == status[0] || B.Status == status[1])).Select(B => B.ToOwnerViewModel()).ToList();
                else
                    return GetAll().Where(B => B.Place.OwnerID == UserId && (B.Status == status[0])).Select(B => B.ToOwnerViewModel()).ToList();

            }
        }
        public EntityEntry AddBooking(BookingViewModel viewModel)
        {
            var model = viewModel.ToModel();
            var result = Add(model);
            return result;
        }

        public EntityEntry RemoveBooking(BookingViewModel viewModel)
        {
            var model = viewModel.ToModel();
            var result = Remove(model);
            return result;
        }
        public PaginationViewModel<SeeBooking> FilterBy(BookingFilterViewModel viewModel,string UserID)
        {
            var filter = PredicateBuilder.New<Booking>();
            filter.And(B => B.Place.OwnerID == UserID);
            filter.And(B => B.Status != BookingStatus.Rejected);
            if (viewModel.Price != 0)
            {
                filter.And(B=>B.TotalPrice==viewModel.Price);
            }
            if (viewModel.PlaceName != "")
            {
                filter.And(B => B.Place.Name.ToLower().Contains(viewModel.PlaceName.ToLower()));
            }
            if (viewModel.Status != BookingStatus.Pending)
            {
                filter.And(B => B.Status == viewModel.Status);
            }
            if (viewModel.date.Date != DateTime.Now.Date)
            {
                filter.And(B => B.StartTime.Date == viewModel.date);
            }
            var data = GetAll().Where(filter);
            return new PaginationViewModel<SeeBooking>()
            {
                data = Pageination(data, viewModel.pageSize, viewModel.pageIndex).Select(B => B.ToOwnerViewModel()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()

            };
        }
        public EntityEntry UpdateBookingStatus(int bookingId, BookingStatus newStatus)
        {
            var booking = _mydB.Bookings.FirstOrDefault(b => b.ID == bookingId);
            if (booking == null)
            {
                //Booking not found
                return null;
            }

            booking.Status = newStatus;
            var result = Update(booking);
            return result;
        }
        // Get ALL Customer  for  Specific Owner
        public int GetCustomerCountForSpecificOwner(string OwnerID)
        {
            int count = 0;
            List<string> Customers=new List<string>();
            IQueryable<Place> places = placeManager.GetPlacesForOwner(OwnerID);
            foreach (Place place in places) {
                List<string> PlacesCustomers = place.Bookings.Select(B => B.UserID).Distinct().ToList();
                foreach (string Customer in PlacesCustomers
                    
                    )
                {
                    if (Customers.Contains(Customer)) {
                        continue;
                    }
                    Customers.Add(Customer);
                }
            }
            count = Customers.Count;
            return count;

        }
        // GET ALL Booking For Specific Owner
        public  int GetBookingCountForSpecificOwner(string OwnerID)
        {
            int count = 0;
            IQueryable<Place> places = placeManager.GetPlacesForOwner(OwnerID);
            foreach (Place place in places)
            {
                List<string> Bookings = place.Bookings.Where(B=>B.Status != BookingStatus.Rejected).Select(B => B.UserID).Distinct().ToList();
                count += Bookings.Count;
            }
            return count;

        }
        public float GetTotalEarningForSpecificCustomer(string OwnerID)
        {
            float count = 0;
            IQueryable<Place> places = placeManager.GetPlacesForOwner(OwnerID);
            foreach (Place place in places)
            {
                float price = place.Bookings.Where(B => B.Status == BookingStatus.Completed).Select(B => B.TotalPrice).Sum();
                count +=price;
            }
            return count;

        }
        // GET ALLBooking Count
        public int GetALLBookingCount()
        {
            return GetAll().Where(B=>B.Status!=BookingStatus.Rejected).Count();
        }
        // GET Total Earing For Booking
        public float GetTotalEarningsBooking()
        {
            return GetAll().Where(B=>B.Status==BookingStatus.Completed).Select(B => B.TotalPrice).Sum();
        }
        
     }
}