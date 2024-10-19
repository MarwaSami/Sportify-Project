using LinqKit;
using Microsoft.AspNetCore.Identity;
using Models;
using Repository;
using System.Drawing.Printing;
using System.Linq;
using System.Numerics;
using ViewModel;

namespace Services
{
    public class TrainerManager : MainManager<User>
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly UserManager<User> userManager;
        public TrainerManager(UnitOfWork unitOfWork, SportfiyContext _mydB, UserManager<User> _userManager) : base(_mydB)
        {
            _unitOfWork = unitOfWork;
            userManager = _userManager;
        }


        #region Schedule
        //Done add and update Remain Get schedule
        public async Task<string> SetScheduleAsync(SetScheduleViewModel viewModel)
        {
            User user = await userManager.FindByIdAsync(viewModel.TrainerID);
            if (user != null)
            {
                var schedule = viewModel.ToAddModel();
                if (schedule.Count > 0)
                {
                    user.TrainerSchedules = schedule;
                    var result = await userManager.UpdateAsync(user);
                    _unitOfWork.commit();
                    if (result.Succeeded)
                    {
                        return "it is added Successfully";
                    }
                    else
                    {
                        return "there is an error try again";
                    }
                }
                else
                {
                    return "You must add valid data";
                }
            }
            else
            {
                return "User is Not Found";
            }
        }
        public async Task<string> updateSchedule(SetScheduleViewModel viewModel)
        {
            User user = await userManager.FindByIdAsync(viewModel.TrainerID);
            if (user != null)
            {
                var oldSchedule = user.TrainerSchedules;
                var newSchedule = viewModel.ToAddModel();
                if (newSchedule.Count > 0)
                {
                    user.TrainerSchedules = oldSchedule.ToUpdateModel(newSchedule);
                    var result = await userManager.UpdateAsync(user);
                    _unitOfWork.commit();
                    if (result.Succeeded)
                    {
                        return "it is added Successfully";
                    }
                    else
                    {
                        return "there is an error try again";
                    }
                }
                else
                {
                    return "You must add valid data";
                }
            }
            else
            {
                return "User is Not Found";
            }
        }
        public async Task<getScheduleViewModel> getSchedule(string TrainerID)
        {
            User user = await userManager.FindByIdAsync(TrainerID);
            if (user != null)
            {
                var oldSchedule = user.TrainerSchedules;
                if (oldSchedule != null)
                {
                    return oldSchedule.ToList().ToViewScheduleModel();
                }
                return null;
            }
            return null;
        }
        #endregion
        // Get All trainer and Trainer by id 
        public async Task<PaginationViewModel<TrainerCardViewModel>> Get(int pageSize = 6, int pageIndex = 1)
        {
            var data = await userManager.GetUsersInRoleAsync("Trainer");
            int SkipNum = (pageIndex - 1) * pageSize;

            data = data.Where(t => t.Category != null || t.Surface != null || t.PricePerSession != null).ToList();

            var res = data.Skip(SkipNum).Take(pageSize).Select(i => i.ToViewModel()).ToList();

            return new PaginationViewModel<TrainerCardViewModel>()
            {
                data = res,
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = data.Count

            };
        }
        public PaginationViewModel<TrainerCardViewModel> FilterBy(TrainerFilterViewModel viewModel)
        {
            var filter = PredicateBuilder.New<User>(true);
            //Category
            filter = filter.And(U => U.IsDeleted == false && (U.Category != null || U.Surface != null || U.PricePerSession != null));
            #region Filter By Category
            if (viewModel.CategoryID.Count != 0)
            {
                var catfilter = PredicateBuilder.New<User>(false);
                foreach (int categoryid in viewModel.CategoryID)
                {
                    catfilter = catfilter.Or(U => U.CategoryID == categoryid);
                }
                filter = filter.And(catfilter);
            }
            #endregion
            //Location
            #region By City
            //For loaction:city
            if (viewModel.City.Count != 0)
            {
                var cityfilter = PredicateBuilder.New<User>();
                foreach (string city in viewModel.City)
                {
                    cityfilter = cityfilter.Or(U => U.Location.ToLower().Contains(city));
                }
                filter = filter.And(cityfilter);
            }
            #endregion
            //Surface
            #region By Surface
            if (viewModel.SurfaceID.Count != 0)
            {
                var sufaceid = PredicateBuilder.New<User>();
                foreach (int SurfaceID in viewModel.SurfaceID)
                {
                    sufaceid = sufaceid.Or(U => U.SurfaceID == SurfaceID);
                }
                filter = filter.And(sufaceid);
            }
            #endregion
            List<User> data = FilterBY(filter, viewModel.OrderBy, viewModel.IsAscending).ToList();
            List<User> newdata = new List<User>();
            foreach (var item in data)
            {
                newdata.Add(item);
            }
            //Customer Rate
            #region By Customer Rate
            if (viewModel.RateValue.Count != 0)
            {
                foreach (int rate in viewModel.RateValue)
                {
                    foreach (var trainer in data)
                    {
                        float placeRate = trainer.GetTrainerAvgRate();
                        if (!(((int)placeRate) >= rate))
                        {
                            newdata.Remove(trainer);
                        }

                    }
                }
            }
            #endregion
            return new PaginationViewModel<TrainerCardViewModel>()
            {

                data = TrainerPagination(newdata, viewModel.pageSize, viewModel.pageIndex).Select(T => T.ToViewModel()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()
            };
        }
        public PaginationViewModel<TrainerCardViewModel> SearchBY(TrainerSearchViewModel viewModel)
        {
            var filter = PredicateBuilder.New<User>();
            filter = filter.And(P => P.IsDeleted == false);
            // All places that has seculde now and 

            if (viewModel.CategoryID != 0)
            {
                filter = filter.And(U => U.CategoryID == viewModel.CategoryID);
            }
            if (viewModel.City != "")
            {
                filter = filter.And(U => U.Location.ToLower().Contains(viewModel.City.ToLower()));
            }
            var data = GetAll().Where(filter).ToList();
            var filterdata = new List<User>();
            foreach (var user in data)
            {
                if (user.GetAvailableTrainer(viewModel.AvailableTime))
                {
                    filterdata.Add(user);
                }
            }
            return new PaginationViewModel<TrainerCardViewModel>()
            {
                data = TrainerPagination(filterdata, viewModel.pageSize, viewModel.pageIndex).Select(U => U.ToViewModel()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()
            };
        }
        public TrainerCardViewModel GetByID(string id)
        {

            return GetAll().Where(i => i.Id == id)
                .Select(i => i.ToViewModel()).FirstOrDefault();
        }
        #region Trainer Profile
        public UpdateProfileViewModel GetTrainerProfile(string? userID)
        {
            throw new NotImplementedException();
        }
        public void UpdateProfileData(UpdateProfileViewModel viewModel)
        {

            _unitOfWork.commit();
        }
        public UpdateProfileViewModel UpdateTrainerProfile(UpdateProfileViewModel viewModel)
        {
            var trainer = base.GetAll().Where(p => p.Id == viewModel.ID).FirstOrDefault();
            if (trainer == null)
            {

                return null;
            }
            base.Update(viewModel.ToModel(trainer));
            _unitOfWork.commit();
            return trainer.ToUpdateViewModel();
        }
        public UpdateProfileViewModel DataToUpdateTrainerProfile(string UserId)
        {
            var trainer = base.GetAll().Where(p => p.Id == UserId).FirstOrDefault();
            if (trainer == null)
            {

                return null;
            }
            return trainer.ToUpdateViewModel();
        }

        #endregion
        //GEt booking list for trainer
        public List<TrainerUserListViewModel> GetTrainerBookingList(string UserId)
        {
            var customer = base.GetAll().Where(c => c.Id == UserId).FirstOrDefault();
            if (customer != null)
            {
                return customer.Users.Select(i => i.ToModel()).ToList();
            }
            return null;

        }
        public IEnumerable<User> TrainerPagination(List<User> trainers, int pageSize, int pageIndex)
        {
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }
            //   3 =>    13/6=2.1
            var temp = trainers.Count / Convert.ToDouble(pageSize);
            if (pageIndex > temp + 1)
            {
                pageIndex = 1;
            }
            int ToBeSkiped = (pageIndex - 1) * pageSize;
            return trainers.Skip(ToBeSkiped).Take(pageSize);
        }
        public List<string> GetCities()
        {
            return GetAll().Where(U => U.Location != null && U.PricePerSession != null).Select(U => U.Location).ToList();
        }
    }
}