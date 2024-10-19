using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;

namespace Repository
{
    public class PreferredSportsManger : MainManager<PreferredSport>
    {
        CategoryManager categoryManager;
        private UnitOfWork unitofwork;
        public PreferredSportsManger(SportfiyContext _mydB, UnitOfWork _unitOfWork, CategoryManager manager) : base(_mydB)
        {
            categoryManager = manager;
            unitofwork = _unitOfWork;
        }

        public List<PreferredSportViewModel> GetByUser(string userId)
        {
           var oldSelectedSports= base.GetAll().Where(p => p.UserID == userId).ToList();
           var allCategory = categoryManager.GetAll().ToList();
            var resault= new List<PreferredSportViewModel>();   
            foreach (var item in allCategory)
            {
                resault.Add(new PreferredSportViewModel()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Pic = item.Pic,
                    Status = oldSelectedSports.Where(p=>p.CategoryID == item.ID).Count() == 0? false: true,
                });
            }

            return resault;
        }
        public List<PreferredSportViewModel> Add(string userId, int CatagoryID) {

            base.Add(new PreferredSport()
            {
                CategoryID = CatagoryID,
                UserID = userId,
            });
            unitofwork.commit();
            var oldSelectedSports = base.GetAll().Where(p => p.UserID == userId).ToList();
            var allCategory = categoryManager.GetAll().ToList();
            var resault = new List<PreferredSportViewModel>();
            foreach (var item in allCategory)
            {
                resault.Add(new PreferredSportViewModel()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Pic = item.Pic,
                    Status = oldSelectedSports.Where(p => p.CategoryID == item.ID).Count() == 0 ? false : true,
                });
            }

            return resault;
        }
        public List<PreferredSportViewModel> Remove(string userId, int CatagoryID)
        {
           var toberemoved=  base.GetAll().Where(p=> p.UserID == userId && p.CategoryID == CatagoryID).FirstOrDefault();
            base.Remove(toberemoved);
            unitofwork.commit();
            var oldSelectedSports = base.GetAll().Where(p => p.UserID == userId).ToList();
            var allCategory = categoryManager.GetAll().ToList();
            var resault = new List<PreferredSportViewModel>();
            foreach (var item in allCategory)
            {
                resault.Add(new PreferredSportViewModel()
                {
                    ID = item.ID,
                    Name = item.Name,
                    Pic = item.Pic,
                    Status = oldSelectedSports.Where(p => p.CategoryID == item.ID).Count() == 0 ? false : true,
                });
            }

            return resault;
        }

    }
}
