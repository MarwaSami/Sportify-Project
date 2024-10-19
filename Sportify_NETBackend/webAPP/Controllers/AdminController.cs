using Microsoft.AspNetCore.Mvc;
using Repository;
using ViewModel;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace webAPP.Controllers
{
    public class AdminController : ControllerBase
    {
        AccountManager accountManager;
        PlaceManager placeManager;
        BookingManager PlacebookingManager;
        TrainerBookingManager TrainerBookingManager;
        public AdminController(AccountManager _accountManager,PlaceManager _placeManager, BookingManager placebookingManager, TrainerBookingManager trainerBookingManager)
        {
            accountManager = _accountManager;
            placeManager = _placeManager;
            PlacebookingManager = placebookingManager;
            TrainerBookingManager = trainerBookingManager;
        }
        public async Task<IActionResult> GetCustomers(int pageSize = 20, int pageIndex = 1)
        {
            var Customer = await accountManager.GetCustomer(pageSize, pageIndex);
            return new JsonResult(Customer);
        }
        public async Task<IActionResult> GetTrainers(int pageSize = 20, int pageIndex = 1)
        {
            var Trainers = await accountManager.GetTrainer(pageSize, pageIndex);
            return new JsonResult(Trainers);

        }

        public async Task<IActionResult> GetOwners(int pageSize = 20, int pageIndex = 1)
        {
            var Owners = await accountManager.GetOwners(pageSize, pageIndex);
            return new JsonResult(Owners);


        }
        // Count for Owners,Customers,Trainers,PlacesBooking,TrainerBooking,places,PlacesEarnings,TrainerEarnings
        public async Task<int> GetCustomerCount()
        {
            var data = await accountManager.GetCustomerCount(); 
            return data;
        }
        public async Task<int> GetOwnerCount()
        {
            var data = await accountManager.GetOwnerCount();
            return data;
        }
        public async Task<int> GetTrainerCount()
        {
           var data = await accountManager.GetTrainerCount();
            return data;
        }
        public async Task<int> GetPlacesCount()
        {
            var count = await placeManager.GetPlacesCount();
            return count;
        }
        public int GetPlaceBookingCount()
        {
            return PlacebookingManager.GetALLBookingCount();
        }
        public float GetPlaceTotalEarnings()
        {
            return PlacebookingManager.GetTotalEarningsBooking();
        }

        public int GetTrainerBookingCount()
        {
            return TrainerBookingManager.GetALLBookingCount();
        }

        public float GetTrainerTotalEarnings()
        {
            return TrainerBookingManager.GetTotalEarningsBooking();
        }

       public async Task<AdminCount> GETALLCount()
        {
          AdminCount admin= new AdminCount();
            admin.Customers = await GetCustomerCount();
            admin.Trainers = await GetTrainerCount();
            admin.Owners = await GetOwnerCount();
            admin.Places = await GetPlacesCount();
            admin.PlaceBooking= GetPlaceBookingCount();
            admin.PlaceTotalEarnings = GetPlaceTotalEarnings();
            admin.TrainerBooking= GetTrainerBookingCount();
            admin.TrainerTotalEarnings = GetTrainerTotalEarnings();
            return admin;
        }
    }
}
