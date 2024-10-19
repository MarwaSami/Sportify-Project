using Microsoft.AspNetCore.Mvc;
using Repository;
using ViewModel;
namespace webAPP
{
    public class CategoryController : ControllerBase
    {
        private CategoryManager cateManager;
        private UnitOfWork unitofwork;
        public CategoryController(CategoryManager _cateManager, UnitOfWork _unitOfWork)
        {
            cateManager = _cateManager;
            unitofwork = _unitOfWork;
        }
        [HttpGet("Category/GetAll")]
        public IActionResult Index()
        {
            return new JsonResult(new APIResult<List<CategoryViewModel>>
            {
                data = cateManager.GetALLcategory(),
                IsSuccceed = true,
                message = "It successfully get all category",
                status = 200
            }) ;   
        }
    }
}
