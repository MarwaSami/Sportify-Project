using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Models;
using Repository;
using System.Text;
using System.Text.Json.Nodes;
using ViewModel;

namespace webAPP.Controllers
{
    public class ScheduleController : Controller
    {
        ScheduleManager scheduleManager;
        UnitOfWork unitOfWork;
        public ScheduleController(ScheduleManager scheduleManager, UnitOfWork _unitOfWork)
        {
            this.unitOfWork = _unitOfWork;
            this.scheduleManager = scheduleManager;
        }
        public IActionResult Add([FromForm] AddScheduleViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                scheduleManager.Add(viewModel);
                return new JsonResult("schedule Added Succesfuly");
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

                return new JsonResult(str.ToString());
            }
        }
        public IActionResult Remove([FromForm] AddScheduleViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                //var result = scheduleManager.Delete(id);
                unitOfWork.commit();
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "You successfully remove Schedule",
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
                return new JsonResult(str.ToString());
            }
        }
        //public IActionResult GetOne(int id)
        //{
        //    //ScheduleViewModel schedule = scheduleManager.GetOneById(id);
        //    return new JsonResult("Schedule imported");
        //}
        public IActionResult GetPlaceScedule(int id)
        {
            var result =scheduleManager.GetAvaiblePlaceAttime(id);
            return new JsonResult(new APIResult<List<ScheduleDetailViewModel>>()
            {
                data = result,
                IsSuccceed = true,
                message = "You successfully Get all Places",
                status = 200
            });
        }
        //public IActionResult GetOne(int id)
        //{
        //    ScheduleViewModel schedule = scheduleManager.GetOneById(id);
        //    return new JsonResult("Schedule imported");
        //}
    }
}
