using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class BlogExtantions
    {
        public static BBlog ToModel (this AddBlogViewModel addBlogViewModel)
        {
            string Path = Directory.GetCurrentDirectory() + "/Content/Images/" + addBlogViewModel.ImgUrl.FileName;
            FileStream file = new FileStream(Path, FileMode.Create);
            addBlogViewModel.ImgUrl.CopyTo(file);
            file.Position = 0;
            file.Close();
            return new BBlog
            {
                Title = addBlogViewModel.Title,
                Content = addBlogViewModel.Content,
                ModificationBy = addBlogViewModel.ModificationBy,
                IsDeleted = addBlogViewModel.IsDeleted,
                ModificationDate = addBlogViewModel.ModificationDate,
                CategoryID = addBlogViewModel.CategoryID,
                ImgUrl = addBlogViewModel.ImgUrl.FileName,
                Tages=addBlogViewModel.Tags
            };
        }
        public static BlogViewModel ToViewModel (this BBlog blog)
        {
            return new BlogViewModel
            {
                ID = blog.ID,
                Title = blog.Title,
                Content = blog.Content,
                CategoryID = blog.CategoryID,
                ImgUrl = blog.ImgUrl,
                CategoryName = blog.Category.Name,
                tags=blog.Tages
            };
        }
    }
}
