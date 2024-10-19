using Microsoft.AspNetCore.Http;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class AddBlogViewModel
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public string Tags { get; set; } = string.Empty;
        public string ModificationBy { get; set; } = "";
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public int CategoryID { get; set; }
        public bool IsDeleted { get; set; } = false;
        public IFormFile ImgUrl {  get; set; }

    }
}
