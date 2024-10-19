using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Repository;
using System.Security.Claims;
using System.Text;
using ViewModel;

namespace webAPP.Controllers
{
    public class BlogController : ControllerBase
    {
        public BlogManager Manager;
        public UnitOfWork UnitOfWork;
        public BlogController(BlogManager blogManager, UnitOfWork unitOfWork)
        {
            this.Manager = blogManager;
            this.UnitOfWork = unitOfWork;
        }
        //[Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Add([FromForm]AddBlogViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                //var AdminID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                //viewModel.ModificationBy = AdminID;
                 var result = Manager.Add(viewModel);
                UnitOfWork.commit();
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "You successfully Add Blog",
                    status = 200
                });
            }
            else
            {
                var str = new StringBuilder();
                foreach (var item in ModelState.Values)
                {
                    foreach (var item1 in item.Errors)
                    {
                        str.Append(item1.ErrorMessage);
                    }
                }
                return new JsonResult(new APIResult<StringBuilder>()
                {
                    data = str,
                    IsSuccceed = true,
                    message = "Refused",
                    status = 200
                });
            }
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet]
        public IActionResult GetAll(int pageSize=4,int pageIndex=1)
        {
            return new JsonResult(new APIResult<PaginationViewModel<BlogViewModel>>()
            {
                data = Manager.Get(pageSize,pageIndex),
                IsSuccceed = true,
                message = "You successfully get all blogs",
                status = 200
            });
        }
        [HttpGet]
        public IActionResult GetLatestThree()
        {
            return new JsonResult(new APIResult<List<BlogViewModel>>()
            {
                data = Manager.GetLatestThree(),
                IsSuccceed = true,
                message = "Successfully get all data",
                status = 200
            });
        }
        //[Authorize(Roles = "Admin")]
        [HttpGet("Blog/GetDetails/{id}")]
        public IActionResult GetDetails(int id)
        {
            return new JsonResult(new APIResult<BlogViewModel>()
            {
                data = Manager.GetById(id),
                IsSuccceed = true,
                message = "You successfully get blog",
                status = 200
            });
        }
    }
}
