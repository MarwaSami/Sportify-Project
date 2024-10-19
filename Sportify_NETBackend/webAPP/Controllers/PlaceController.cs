using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System.Diagnostics.Metrics;
using System.Security.Claims;
using ViewModel;

namespace webAPP
{
    public class PlaceController : ControllerBase
    {
        private PlaceManager placeManager;
        private UnitOfWork unitofwork;
        public PlaceController(PlaceManager _placeManager, UnitOfWork _unitOfWork)
        {
            placeManager = _placeManager;
            unitofwork = _unitOfWork;
        }
        // Go to filter with all
        public IActionResult Index(int pageSize=8,int pageIndex=1)
        {
            return new JsonResult(new APIResult<PaginationViewModel<PlaceFilterViewModel>>()
            {
                data = placeManager.GetALLplaces(pageSize,pageIndex),
                IsSuccceed = true,
                message = "You successfully Get all Places",
                status = 200
            });
        }
        public IActionResult CustomerShowPlaceDetails(int id)
        {
            return new JsonResult(new APIResult<CustomerPlaceDetailsViewModel>()
            {
                data = placeManager.CustomerShowPlaceDetails(id),
                IsSuccceed = true,
                message = "You successfully Get all Places",
                status = 200
            });
        }
        [Authorize(Roles = "Owner")]
        public IActionResult GetOwnerPlaces()
        {
            PaginationViewModel<SeemyPlaceViewModel> result = placeManager.GetOwnerPlaces(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            return new JsonResult(new APIResult<PaginationViewModel<SeemyPlaceViewModel>>()
            {
                data = result,
                IsSuccceed = true,
                message = "You successfully Add Place",
                status = 200
            });
        }
        [Authorize(Roles = "Owner")]
        public IActionResult GetOwnerPlacesForReviews()
        {
           var result = placeManager.GetOwnerPlacesForReviews(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            return new JsonResult(new APIResult<List<SeemyPlaceViewModel>>()
            {
                data = result,
                IsSuccceed = true,
                message = "You successfully Add Place",
                status = 200
            });
        }
        [Authorize(Roles = "Owner")]
        public IActionResult OwnerShowPlaceDetails(int id)
        {
            return new JsonResult(new APIResult<OwnerPlaceDetailsViewModel>()
            {
                data = placeManager.OwnerShowPlaceDetails(id),
                IsSuccceed = true,
                message = "You successfully Get all Places",
                status = 200
            });
        }
        // For Edit
        [Authorize(Roles = "Owner")]
        public IActionResult GetPlaceByID(int Id)
        {
            return new JsonResult(new APIResult<AddEditPlaceViewModel>()
            {
                data = placeManager.GetPlacebyId(Id),
                IsSuccceed = true,
                message = "You successfully Get all Places",
                status = 200
            });
        }

        [HttpPost]
        public IActionResult Filter([FromBody] PlaceFilterByViewModel viewModel)
        {
            var Places = placeManager.FilterPlace(viewModel);
            return new JsonResult(new APIResult<PaginationViewModel<PlaceFilterViewModel>>()
            {
                data = Places,
                IsSuccceed = true,
                message = "You successfully get place",
                status = 200
            });
        }
        [HttpPost]
        public IActionResult Search([FromBody] PlaceSearchViewModel viewModel)
        {
            var Places = placeManager.SearchForPlace(viewModel);
            return new JsonResult(new APIResult<PaginationViewModel<PlaceFilterViewModel>>()
            {
                data = Places,
                IsSuccceed = true,
                message = "You successfully get place",
                status = 200
            });
        }
        //For Landing PagesCounts
        public IActionResult GetPlaceCount(int CategoryID)
        {
            return new JsonResult(new APIResult<int>()
            {
                data = placeManager.GetCountCategory(CategoryID),
                IsSuccceed = true,
                message = "You successfully get count",
                status = 200
            });
        }
        public IActionResult GetCounterForPlace(int CategoryID)
        {
            if (CategoryID > 0)
            {
                int Counter=placeManager.GetCountCategory(CategoryID);
                return new JsonResult(new APIResult<int>
                {
                    data = Counter,
                    IsSuccceed = true,
                    message = "successfully get counter",
                    status = 200
                });

            }
            else
            {
                return new JsonResult(new APIResult<int>
                {
                    data = CategoryID,
                    IsSuccceed = false,
                    message = "Category is not exist",
                    status = 400
                });
            }
        }
        public IActionResult PlaceCities()
        {
            return new JsonResult(new APIResult<List<string>>
            {
                data = placeManager.GetCities(),
                IsSuccceed = true,
                message = "you sucessfully get all cities of places",
                status = 200
            });
        }
        [Authorize(Roles = "Owner")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult AddPlace(AddEditPlaceViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var files = viewModel.file;
                viewModel.OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
                viewModel.ModificationBy = viewModel.OwnerID;
                int ownerplacescount = placeManager.GetPlacesCountForOwner(viewModel.OwnerID);
                if (ownerplacescount < 2)
                {
                    //  check mebership 
                var result = placeManager.AddPlace(viewModel);
                unitofwork.commit();
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "You successfully Add Place",
                    status = 200
                });
                }
                else
                {
                    
                    return new JsonResult(new APIResult<string>()
                    {
                        data = "membership",
                        IsSuccceed = false,
                        message = "You need to upgrade your membership",
                        status = 200
                    });
                }
            }
            else
            {
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "You must Add all required data for  Place",
                    status = 400
                });
            }
        }
        [Authorize(Roles = "Owner")]
        [HttpPost, DisableRequestSizeLimit]
        public IActionResult EditPlace(AddEditPlaceViewModel viewModel)
        {

            viewModel.OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            viewModel.ModificationBy = viewModel.OwnerID;
             placeManager.UpdatePlace(viewModel);
           
            return new JsonResult(new APIResult<string>()
            {
                data = "",
                IsSuccceed = true,
                message = "You successfully Updated Place",
                status = 200
            });
        }
        public IActionResult RemovePlace(int id)
        {
            this.placeManager.RemovePlace(id);
            this.unitofwork.commit();
            return new JsonResult(new APIResult<string>()
            {
                data = "",
                message = "it is successfully deleted",
                IsSuccceed = true,
                status = 200

            });
        }
        public async Task<IActionResult> GetPlaces(int pageSize = 20, int pageIndex = 1)
        {
            var Places =  placeManager.GetALLplaces(pageSize, pageIndex);
            return new JsonResult(Places);
            
        }
        public IActionResult GetPlacesCount()
        {
            string OwnerID = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (OwnerID != null)
            {
                var count=placeManager.GetPlacesCountForOwner(OwnerID);
                return new JsonResult(new APIResult<int>()
                {
                    data=count,
                    IsSuccceed=true,
                    message="Sucessfully get all data",
                    status=200
                });
            }
            else
            {
                return new JsonResult(new APIResult<int>()
                {
                    data = 0,
                    IsSuccceed = false,
                    message = "Error ",
                    status = 400
                });
            }

        }
          
    }
}
