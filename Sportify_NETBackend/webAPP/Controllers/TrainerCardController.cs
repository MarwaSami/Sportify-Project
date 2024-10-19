using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using ViewModel;
using Repository;

namespace webAPP.Controllers
{

    public class TrainerCardController : ControllerBase
    {
            private  TrainerManager trainerManager;
            private UnitOfWork unitOfWork;
            public TrainerCardController(TrainerManager _trainerManager,UnitOfWork _unitOfWork)
            {
                trainerManager = _trainerManager;
                unitOfWork = _unitOfWork;
            }

        [HttpGet]
        [Route("TrainerCard/GetAll")]
        public async Task<IActionResult> GetTrainerCard(int pageSize = 20, int pageIndex = 1)
        {
           
            var Trainer = await trainerManager.Get(pageSize,pageIndex);
            
            return new JsonResult(Trainer);
        }



        [HttpGet("TrainerCard/Getone/{id}")]
        public IActionResult GetTrainerCardById(string id)
        {
            var Trainer =  trainerManager.GetByID(id);
             unitOfWork.commit();
            return new JsonResult(Trainer);
        }

        

    }
}
