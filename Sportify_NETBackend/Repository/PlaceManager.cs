using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LinqKit;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using Models;
using ViewModel;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Repository
{
    public class PlaceManager : MainManager<Place>
    {
        //Note : API Result

        PlaceAttachmentManager placeAttachment;
        UnitOfWork unitOfWork;
        SportfiyContext mydB;
        public PlaceManager(SportfiyContext _mydB, UnitOfWork _unitOfWork, PlaceAttachmentManager _placeAttachment) : base(_mydB)
        {
            placeAttachment = _placeAttachment;
            unitOfWork = _unitOfWork;
            mydB = _mydB;
        }
        public Place GetbyId(int id)
        {
            return GetAll().Where(P => P.IsDeleted == false && P.ID == id).FirstOrDefault()!;
        }

        //  get all places for Customers
        #region Customer Methods
        public PaginationViewModel<PlaceFilterViewModel> GetALLplaces(int pageSize = 6, int pageIndex = 1)
        {
            var data = GetAll().Where(P => P.IsDeleted == false);

            return new PaginationViewModel<PlaceFilterViewModel>()
            {
                data = Pageination(data, pageSize, pageIndex).Select(P => P.TOFilterView()).ToList(),
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = data.Count()
            };
        }
        public CustomerPlaceDetailsViewModel CustomerShowPlaceDetails(int id)
        {
            var place = GetbyId(id);
            var result = new CustomerPlaceDetailsViewModel();
            result.ID = place.ID;
            result.Name = place.Name;
            result.OwnerName = place.Owner.UserName;
            result.Description = place.Description;
            result.Price = place.PricePerhour;
            result.Category = place.category.Name;
            result.Address = place.City + " , " + place.Street;
            result.Facilities = place.FacilityPlaces.Select(i => i.Facility.Name).ToList();
            result.Attachments = place.Attachments.Select(i => i.Name).ToList();
            result.Price = place.PricePerhour;
            result.Type = place.TypeID;
            result.Bookings = place.Bookings.Select(i => new OwnerBookingViweModel()
            {
                ID = i.ID,
                Name = i.User.UserName,
                StartTime = i.StartTime,
                EndTime = i.EndTime,
                Status = i.Status,
                OrderDate = i.StartTime
            }).ToList();
            result.WorkingHours = place.Schedules.Select(i => new SetScheduleDayViewModel()
            {
                Day = i.Day,
                StartTime = i.StartTime,
                EndTime = i.EndTime
            }).ToList();
            return result;
        }
        public List<SeemyPlaceViewModel> GetOwnerPlacesForReviews(string OwnerID)
        {
            var data = GetAll().Where(P => P.IsDeleted == false && P.OwnerID == OwnerID);
            return data.Select(P => P.ToMyplacesView()).ToList();
           
        }
        // get myplaces for owner remain pegination
        public PaginationViewModel<SeemyPlaceViewModel> GetOwnerPlaces(string OwnerID, int pageSize = 4, int pageIndex = 1)
        {
            var data = GetAll().Where(P => P.IsDeleted == false && P.OwnerID == OwnerID);
            return new PaginationViewModel<SeemyPlaceViewModel>()
            {
                data = data.Select(P => P.ToMyplacesView()).ToList(),
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = data.Count()
            };
        }
        public OwnerPlaceDetailsViewModel OwnerShowPlaceDetails(int id)
        {
            var place = GetbyId(id);
            var res = new OwnerPlaceDetailsViewModel();
            res.ID = place.ID;
            res.Name = place.Name;
            res.Description = place.Description;
            res.Category = place.category.Name;
            res.Address = place.City + " , " + place.Street;
            res.Facilities = place.FacilityPlaces.Select(i => i.Facility.Name).ToList();
            res.Attachments = place.Attachments.Select(i => i.Name).ToList();
            res.Bookings = place.Bookings.Select(i => new OwnerBookingViweModel()
            {
                ID = i.ID,
                Name = i.User.UserName,
                StartTime = i.StartTime,
                EndTime = i.EndTime,
                TotalPrice = i.TotalPrice,
                Status = i.Status,
                OrderDate = i.StartTime
            }).ToList();
            return res;
        }
        // For Details
        // For Get Place for Edit
        public AddEditPlaceViewModel GetPlacebyId(int id)
        {
            return GetAll().Where(P => P.IsDeleted == false && P.ID == id).Select(P => P.ToEditView()).FirstOrDefault()!;
        }
        public EntityEntry AddPlace(AddEditPlaceViewModel viewModel)
        {
            Place place = viewModel.ToAddModel();
            var result = Add(place);
            return result;
        }
        public void UpdatePlace(AddEditPlaceViewModel viewModel)
        {
            Place OldPlace = GetbyId(viewModel.Id);

            if (OldPlace != null)
            {
                Place NewPlace = viewModel.ToAddModel();
                if (viewModel.file != null)
                {
                    if (OldPlace.Attachments.Count > 0)
                    {

                        foreach (var attachment in OldPlace.Attachments)
                        {
                            placeAttachment.Remove(attachment);
                            unitOfWork.commit();
                            attachment.Name.RemoveFile();
                        }
                    }

                }
                var ids = OldPlace.ToUpdateModel(NewPlace);
                var result = Update(OldPlace);
                unitOfWork.commit();
                foreach (var item in ids)
                {
                    mydB.FacilityPlaces.Remove(mydB.FacilityPlaces.FirstOrDefault(i => i.ID == item));
                }
                unitOfWork.commit();
            }
        }
        // confirm remove
        public string RemovePlace(int id)
        {
            Place place = GetbyId(id);
            if (place != null)
            {
                place.IsDeleted = true;
                Update(place);
                return "Successfully Removed";
            }
            return "Place is Not exist";
        }
        // Search Remain
        public PaginationViewModel<PlaceFilterViewModel> FilterPlace(PlaceFilterByViewModel viewModel)
        {
            var filter = PredicateBuilder.New<Place>(true);
            //P.ID==Viewmodel.ID and P.Name==viewmodel.Name and (P.categoryid==cateid[0]Or P.categoryid==cateid[0)
            filter = filter.And(P => P.IsDeleted == false);
            #region Filter By Category
            if (viewModel.CategoryID.Count != 0)
            {
                var catfilter = PredicateBuilder.New<Place>(false);
                foreach (int categoryid in viewModel.CategoryID)
                {
                    catfilter = catfilter.Or(P => P.CategoryID == categoryid);
                }
                filter = filter.And(catfilter);
            }
            #endregion 
            #region By City
            //For loaction:city
            if (viewModel.City.Count != 0)
            {
                var cityfilter = PredicateBuilder.New<Place>();
                foreach (string city in viewModel.City)
                {
                    cityfilter = cityfilter.Or(P => P.City.ToLower().Contains(city));
                }
                filter = filter.And(cityfilter);
            }
            #endregion 
            #region ByFacilites
            if (viewModel.FacilityID.Count != 0)
            {
                var facfilter = PredicateBuilder.New<Place>(false);
                // Remain Logic of Facilites
                foreach (int facilitiy in viewModel.FacilityID)
                {
                    facfilter = facfilter.Or(P => P.FacilityPlaces.Any(F => F.FacilityID == facilitiy));
                }
                filter = filter.And(facfilter);
            }
            #endregion
            #region By Type
            if (viewModel.TypeID.Count != 0)
            {
                var typeid = PredicateBuilder.New<Place>();
                foreach (int TypeID in viewModel.TypeID)
                {
                    typeid = typeid.Or(P => P.TypeID == TypeID);
                }
                filter = filter.And(typeid);
            }
            #endregion //For Surface
            #region By Surface
            if (viewModel.SurfaceID.Count != 0)
            {
                var sufaceid = PredicateBuilder.New<Place>();
                foreach (int SurfaceID in viewModel.SurfaceID)
                {
                    sufaceid = sufaceid.Or(P => P.SurfaceID == SurfaceID);
                }
                filter = filter.And(sufaceid);
            }
            #endregion
            List<Place> data = FilterBY(filter, viewModel.OrderBy, viewModel.IsAscending).ToList();
            List<Place> newdata = new List<Place>();
            foreach (var item in data)
            {
                newdata.Add(item);
            }
            // Capacity error logic ,Location and 
            #region By Capacity
            if (viewModel.Capacity.Count != 0)
            {
                // Get All Places with avaible capacity:

                foreach (int capacity in viewModel.Capacity)
                {
                    foreach (var place in data)
                    {
                        int currentCapacity = place.GetCurrentCapacity(DateTime.Now);
                        if (!(currentCapacity >= capacity))
                        {
                            newdata.Remove(place);
                        }

                    }
                }
            }
            #region By Customer Rate
            if (viewModel.RateValue.Count != 0)
            {
                foreach (int rate in viewModel.RateValue)
                {
                    foreach (var place in data)
                    {
                        float placeRate = place.GetPlaceAvgRate();
                        if (!(((int)placeRate) >= rate))
                        {
                            newdata.Remove(place);
                        }

                    }
                }
            }
            #endregion}
            #region By Location near You
            if (viewModel.d != 0)
            {
                foreach (var place in data)
                {
                    if (!place.filterbydistance(viewModel.Lang, viewModel.Lat, viewModel.d))
                    {
                        newdata.Remove(place);
                    }

                }
            }
            #endregion
            #endregion
            return new PaginationViewModel<PlaceFilterViewModel>()
            {

                data = PlacePagination(newdata, viewModel.pageSize, viewModel.pageIndex).Select(P => P.TOFilterView()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()
            };
        }
        public PaginationViewModel<PlaceFilterViewModel> SearchForPlace(PlaceSearchViewModel viewModel)
        {
            var filter = PredicateBuilder.New<Place>();
            filter = filter.And(P => P.IsDeleted == false);
            // All places that has seculde now and 

            if (viewModel.CategoryID != 0)
            {
                filter = filter.And(P => P.CategoryID == viewModel.CategoryID);
            }
            if (viewModel.City != "" && viewModel.City != "0")
            {
                filter = filter.And(P => P.City.ToLower().Contains(viewModel.City.ToLower()));
            }
            var data = GetAll().Where(filter).ToList();
            var filterdata = new List<Place>();
            foreach (var P in data)
            {
                if (P.GetAvailablePlace(viewModel.AvailableTime))
                {
                    filterdata.Add(P);
                }
                //  var condition = P.Schedules.Any(S => S.StartTime.Hour == viewModel.AvailableTime.Hour && S.Day.ToLower() == viewModel.AvailableTime.DayOfWeek.ToString().ToLower());
                //if (!condition)
                //  {
                //      data.Remove(P);
                //  }
            }
            return new PaginationViewModel<PlaceFilterViewModel>()
            {
                data = PlacePagination(filterdata, viewModel.pageSize, viewModel.pageIndex).Select(P => P.TOFilterView()).ToList(),
                pageSize = viewModel.pageSize,
                pageIndex = viewModel.pageIndex,
                count = data.Count()
            };
        }
        #endregion
        public int GetCountCategory(int CategoryID)
        {
            return GetAll().Where(P => P.CategoryID == CategoryID).Count();
        }
        public List<string> GetCities()
        {
            return GetAll().Select(P => P.City).Distinct().ToList();
        }
        #region OWner Places Methods
       // get myplaces for owner
        public PaginationViewModel<SeemyPlaceViewModel> GetOwnerPlaces2(string OwnerID, int pageSize = 4, int pageIndex = 1)
        {
            var data = GetAll().Where(P => P.IsDeleted == false && P.OwnerID == OwnerID);
            return new PaginationViewModel<SeemyPlaceViewModel>()
            {
                data = data.Select(P => P.ToMyplacesView()).ToList(),
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = data.Count()
            };
        }
        // For Details
        public OwnerPlaceDetailsViewModel OwnerShowPlaceDetails2(int id)
        {
            var place = GetbyId(id);
            var res = new OwnerPlaceDetailsViewModel();
            res.ID = place.ID;
            res.Name = place.Name;
            res.Description = place.Description;
            res.Category = place.category.Name;
            res.Address = place.City + " , " + place.Street;
            res.Facilities = place.FacilityPlaces.Select(i => i.Facility.Name).ToList();
            res.Attachments = place.Attachments.Select(i => i.Name).ToList();
            res.Bookings = place.Bookings.Select(i => new OwnerBookingViweModel()
            {
                ID = i.ID,
                Name = i.User.UserName,
                StartTime = i.StartTime,
                EndTime = i.EndTime,
                TotalPrice = i.TotalPrice,
                Status = i.Status,
                OrderDate = i.StartTime
            }).ToList();
            return res;
        }
        // For Get Place for Edit
        public AddEditPlaceViewModel GetPlacebyId2(int id)
        {
            return GetAll().Where(P => P.IsDeleted == false && P.ID == id).Select(P => P.ToEditView()).FirstOrDefault()!;
        }
        public EntityEntry AddPlace2(AddEditPlaceViewModel viewModel)
        {
            Place place = viewModel.ToAddModel();
            var result = Add(place);
            return result;
        }
        public void UpdatePlace2(AddEditPlaceViewModel viewModel)
        {
            Place OldPlace = GetbyId(viewModel.Id);

            if (OldPlace != null)
            {
                Place NewPlace = viewModel.ToAddModel();
                if (viewModel.file != null)
                {
                    if (OldPlace.Attachments.Count > 0)
                    {

                        foreach (var attachment in OldPlace.Attachments)
                        {
                            placeAttachment.Remove(attachment);
                            unitOfWork.commit();
                            attachment.Name.RemoveFile();
                        }
                    }

                }
                var ids = OldPlace.ToUpdateModel(NewPlace);
                var result = Update(OldPlace);
                unitOfWork.commit();
                foreach (var item in ids)
                {
                    mydB.FacilityPlaces.Remove(mydB.FacilityPlaces.FirstOrDefault(i => i.ID == item));
                }
                unitOfWork.commit();
            }
        }
        // confirm remove
        public string RemovePlace2(int id)
        {
            Place place = GetbyId(id);
            if (place != null)
            {
                place.IsDeleted = true;
                Update(place);
                return "Successfully Removed";
            }
            return "Place is Not exist";
        }
        #endregion
        // Get All places For Specifici Owner
        public IQueryable<Place> GetPlacesForOwner(string OwnerID)
        {
            return GetAll().Where(P=>P.OwnerID == OwnerID &&P.IsDeleted==false );
        }
        public IEnumerable<Place> PlacePagination(List<Place> places, int pageSize, int pageIndex)
        {
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }
            //   3 =>    13/6=2.1
            var temp = places.Count / Convert.ToDouble(pageSize);
            if (pageIndex > temp + 1)
            {
                pageIndex = 1;
            }
            int ToBeSkiped = (pageIndex - 1) * pageSize;
            return places.Skip(ToBeSkiped).Take(pageSize);
        }



        //Reviews
        public List<PlaceReviewViewModel> GetReviews(int placeId,string OwnerID)
        {
            if(placeId == 0) {
                //get all reviews for owner palces
                var places = base.FilterBY(a => a.OwnerID == OwnerID, nameof(OwnerReview.ID), true).ToList();
                var list = new List<PlaceReviewViewModel>();
                foreach (var place in places)
                {
                    list.AddRange( place.OwnerReviews.Select(p => p.ToPlaceVModal()).ToList());
                }
                return list;

            }
            else
            {
                var place= base.FilterBY(a => a.ID == placeId && a.OwnerID == OwnerID, nameof(OwnerReview.ID), true).FirstOrDefault();
                var reviewModel = place.OwnerReviews.Select(p => p.ToPlaceVModal()).ToList();
                return reviewModel;
            }
        }
        //Count For All places
        public async Task<int> GetPlacesCount()
        {
            var data =  await GetAll().Where(P=>P.IsDeleted==false).ToListAsync();
            return data.Count;
        }
        //Count For Owner Places
        public int GetPlacesCountForOwner(string OwnerID)
        {
            return GetAll().Where(P => P.OwnerID == OwnerID&&P.IsDeleted==false).Count();
        }
    }
}
