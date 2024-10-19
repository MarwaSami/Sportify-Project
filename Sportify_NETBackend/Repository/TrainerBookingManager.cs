using LinqKit;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repository
{
    public class TrainerBookingManager :MainManager<UserTrainer>
    {
        public TrainerBookingManager(SportfiyContext context) : base(context) { }
        // GET Booking For Customer
        public List<CustomerTainerBookingViewModel> GetCustomerBookingBasedOnstatus(string UserID, List<Status> status)
        {
            if (status.Count > 0)
            {
                if (status.Count == 1)
                {
                    return GetAll().Where(B => B.UserId == UserID && B.Status == status[0]).Select(B => B.ToCustomerViewModel()).ToList();

                }
                return GetAll().Where(B => B.UserId == UserID && (B.Status == status[0] || B.Status == status[1])).Select(B => B.ToCustomerViewModel()).ToList();

            }
            else
            {
                return null;
            }
        }
        // Update Booking Status for Customer
        public void UpdateCustomerBookingStatus(string UserID,int  Bookid, Status status)
        {
           UserTrainer book=GetAll().Where(B=>B.ID==Bookid &&B.UserId==UserID).FirstOrDefault();
            if(book!=null)
            {
                book.Status = status;
                Update(book);
            }
        }
        // AddBooking For Customer
        public void AddBooking(AddTrainerBookingViewModel book) {
            var result = book.ToAddModel();
            Add(result);
        }
        // GEtBooking based on staus
        public List<CustomerTainerBookingViewModel> GetBookingBasedOnstatus(string UserID,Status status)
        {
            return GetAll().Where(B => B.UserId == UserID && B.Status == status).Select(B => B.ToCustomerViewModel()).ToList();
        }
        // Update Booking Status for Trainer
        public void UpdateTrainerBookingStatus(string UserID, int Bookid, Status status)
        {
            UserTrainer book = GetAll().Where(B => B.ID == Bookid&&B.TrainerId==UserID).FirstOrDefault();
            if (book != null)
            {
                book.Status = status;
                Update(book);
            }
        }
        public PaginationViewModel<TrainerUserListViewModel> GetAllBooking(string UserId = "", int pageSize = 6, int pageIndex = 1)
        {
            if (UserId == "") return null;
            else
            {
                var data = GetAll().Where(B => B.TrainerId == UserId && B.Status != Models.Status.Rejected);
                return new PaginationViewModel<TrainerUserListViewModel>()
                {
                    data = Pageination(data, pageSize, pageIndex).Select(B => B.ToModel()).ToList(),
                    pageSize = pageSize,
                    pageIndex = pageIndex,
                    count = data.Count()

                };
            }
        }
        public List<TrainerUserListViewModel> GetTrainerLatestBooking(string UserId = "")
        {
            if (UserId == "") return null;
            else
            {
                var data = GetAll().Where(B => B.TrainerId == UserId && B.Status != Models.Status.Rejected).OrderBy("ID",false).Take(3).Select(B=>B.ToModel()).ToList();
                return data;
            }
        }
        public List<TrainerUserListViewModel> GetBookingBasedonStatus(List<Models.Status> status, string UserId = "")
        {
            if (UserId == "") return new List<TrainerUserListViewModel>();
            else
            {
                if (status.Count == 2)
                    return GetAll().Where(B => B.UserId == UserId && (B.Status == status[0] || B.Status == status[1])).Select(B => B.ToModel()).ToList();
                else
                    return GetAll().Where(B => B.UserId == UserId && (B.Status == status[0])).Select(B => B.ToModel()).ToList();

            }
        }
        public List<TrainerUserListViewModel> GetTrainerBookingBasedonStatus(List<Models.Status> status, string UserId = "")
        {
            if (UserId == "") return new List<TrainerUserListViewModel>();
            else
            {
                if (status.Count == 2)
                    return GetAll().Where(B => B.TrainerId == UserId && (B.Status == status[0] || B.Status == status[1])).Select(B => B.ToModel()).ToList();
                else
                    return GetAll().Where(B => B.TrainerId == UserId && (B.Status == status[0])).Select(B => B.ToModel()).ToList();

            }
        }
        public PaginationViewModel<TrainerUserListViewModel> FilterBy(ReservationFilterViewModel viewModel)
        {
            var filter = PredicateBuilder.New<UserTrainer>();
            if (viewModel.Price != 0)
            {
                filter.And(B => B.TotalPrice == viewModel.Price);
            }
            if (viewModel.date != DateTime.Now.Date)
            {
                filter.And(B => B.StartTime.Date == viewModel.date);
            }
            var data = GetAll().Where(filter);
            return new PaginationViewModel<TrainerUserListViewModel>()
            {
                data = Pageination(data, viewModel.pageSize, viewModel.pageIndex).Select(B => B.ToModel()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()

            };
        }
        // GETALLBooking For Trainer and its Customer
        public  int GetCustomerountForSpecificTrainers(string TrainerID)
        {
            return GetAll().Where(B => B.TrainerId == TrainerID).Select(B => B.UserId).Distinct().ToList().Count();

        }
        // GET ALL Booking For Specific Owner
        public int GetBookingCountForSpecificTrainers(string TrainerID)
        {
            var data = GetAllBooking(TrainerID);
            return data.count;

        }
        public int GetTotalEarningForSpecificTrainers(string TrainerID)
        {
            var data = GetAll().Where(B=>B.TrainerId==TrainerID && B.Status==Status.Completed).Select(B=>B.TotalPrice).Sum();
            return data;

        }
        public int GetALLBookingCount()
        {
            return GetAll().Count();
        }
        // GET Total Earing For Booking
        public float GetTotalEarningsBooking()
        {
            return GetAll().Where(B=>B.Status==Status.Completed).Select(B => B.TotalPrice).Sum();
        }
    }
}
