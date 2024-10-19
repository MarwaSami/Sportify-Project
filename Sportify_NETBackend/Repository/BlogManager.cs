using LinqKit;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ViewModel;
using ViewModel;

namespace Repository
{
    public class BlogManager : MainManager<BBlog>
    {
        private readonly SportfiyContext _db;
        public BlogManager(SportfiyContext _mydB) : base(_mydB)
        {
            _db = _mydB;
        }
        public EntityEntry Add(AddBlogViewModel addBlogViewModel)
        {
            BBlog blog = addBlogViewModel.ToModel();
            var result = Add(blog);
            return result;
        }
        public PaginationViewModel<BlogViewModel> Get(int pageSize=4,int pageIndex=1)
        {
            var result = new List<BlogViewModel>();
            var blogs =  GetAll().ToList();
            foreach(BBlog blog in blogs)
            {
               var r = blog.ToViewModel();
                result.Add(r);
            }
            int tobebskiped = (pageIndex - 1) * pageSize;
            var data=result.Skip(tobebskiped).Take(pageSize).ToList();
            return new PaginationViewModel<BlogViewModel>()
            {
                data = data,
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = result.Count()
            };
        }
        public List<BlogViewModel> GetLatestThree()
        {
            var blogs = GetAll().OrderBy("ID",false).Take(3).Select(B=>B.ToViewModel()).ToList();
            return blogs;
        }
        public BlogViewModel GetById(int id)
        {
            BBlog result = GetAll().Where(i => i.ID == id).FirstOrDefault();
            return result.ToViewModel();
        }
    }
}
