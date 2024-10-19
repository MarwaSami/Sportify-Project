using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using Models;
using ViewModel;

namespace Repository
{
    public class CategoryManager : MainManager<Category>
    {
        public CategoryManager(SportfiyContext mydB) : base(mydB) { }
        public List<CategoryViewModel> GetALLcategory()
        {
           return GetAll().Where(C=>C.IsDeleted==false).Select(C => C.TOFilterView()).ToList();
        }
        public void AddCategory(CategoryViewModel viewModel)
        {
            Add(viewModel.ToAddModel());
        }
    }
}

