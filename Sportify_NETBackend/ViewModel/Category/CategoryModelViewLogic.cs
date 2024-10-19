using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
namespace ViewModel
{
    public static class CategoryViewLogic
    {
        public static CategoryViewModel TOFilterView(this Category category)
        {
            return new CategoryViewModel()
            {
                ID = category.ID,
                Name = category.Name,
                Pic = category.Pic,
            };
        }
        public static Category ToAddModel(this CategoryViewModel category)
        {
       
            return new Category()
            {
                Name = category.Name,
                Pic = category.Pic,
                ModificationDate = DateTime.Now,
                ModificationBy = "",
                IsDeleted = false
            };
        }
     
    }
}
