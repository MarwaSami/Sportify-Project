using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ViewModel
{
    public static class PlaceModelViewLogic
    {
        // For Filter View : in customer page
        public static PlaceFilterViewModel TOFilterView(this Place place)
        {
            return new PlaceFilterViewModel()
            {
                ID = place.ID,
                Name = place.Name,
                Description = place.Description,
                Facilities = place.FacilityPlaces.Select(Fac => Fac.Facility.Name).ToList(),
                Attachments = place.Attachments.Select(A => A.Name).ToList(),
            };
        }
        // For see my places at owener
        public static AddEditPlaceViewModel ToEditView(this Place place)
        {
            return new AddEditPlaceViewModel()
            {
                Id = place.ID,
                Name = place.Name,
                Description = place.Description,
                Capacity = place.Capacity,
                PricePerhour = place.PricePerhour,
                CategoryID = place.CategoryID,
                TypeID = place.TypeID,
                SurfaceID = place.SurfaceID,
                Lang = place.Lang,
                Lat = place.Lat,
                Street = place.Street,
                City = place.City,
                SchedulesDay = place.Schedules.Select(S => S.Day).ToList(),
                SchedulesStartTime = place.Schedules.Select(S => S.StartTime).ToList(),
                SchedulesEndTime = place.Schedules.Select(S => S.EndTime).ToList(),
                Facilities_ids = place.FacilityPlaces.Select(Fac => Fac.Facility.ID).ToList(),
                Attachments = place.Attachments.Select(A => A.Name).ToList(),
            };
        }
        public static Place ToAddModel(this AddEditPlaceViewModel place)
        {
            List<FacilityPlace> facilities = new List<FacilityPlace>();
            List<Schedule> Schedules = new List<Schedule>();
            List<PlaceAttachments> Attachments = new List<PlaceAttachments>();
            // Add facility
            foreach (var facility in place.Facilities_ids)
            {
                facilities.Add(new FacilityPlace()
                {
                    FacilityID = facility,
                });
            }
            //Add Schedule
            for (int i = 0; i < place.SchedulesDay.Count; i++)
            {
                Schedules.Add(new Schedule()
                {
                    Day = place.SchedulesDay.ElementAt(i),
                    StartTime = place.SchedulesStartTime.ElementAt(i),
                    EndTime = place.SchedulesEndTime.ElementAt(i)
                });
            }
            // Add Attachment
            if (place.file != null)
            {
                place.Attachments = place.file.Upload();
            }
            foreach (var attachment in place.Attachments)
            {

                Attachments.Add(new PlaceAttachments()
                {
                    Name = attachment,
                    ModificationBy = place.OwnerID
                });
            }
            return new Place()
            {
                Name = place.Name,
                Description = place.Description,
                Capacity = place.Capacity,
                PricePerhour = place.PricePerhour,
                Lang = place.Lang,
                Lat = place.Lat,
                City = place.City,
                Street = place.Street,
                CategoryID = place.CategoryID,
                SurfaceID = place.SurfaceID,
                TypeID = place.TypeID,
                OwnerID = place.OwnerID,
                FacilityPlaces = facilities,
                Attachments = Attachments,
                Schedules = Schedules,
                ModificationDate = place.ModificationDate,
                ModificationBy = place.ModificationBy,
                IsDeleted = false
            };
        }
        public static List<int> ToUpdateModel(this Place OldPlace, Place Newplace)
        {
            List<int> ids = new List<int>();
            List<FacilityPlace> facPlaces = new List<FacilityPlace>();
            int count = Newplace.FacilityPlaces.Count > OldPlace.FacilityPlaces.Count ? Newplace.FacilityPlaces.Count : OldPlace.FacilityPlaces.Count;
            foreach (var item in OldPlace.FacilityPlaces)
            {
                bool isset = false;
                if (count > 0)
                {
                    foreach (var newitem in Newplace.FacilityPlaces)
                    {
                        if (facPlaces.Where(F => F.FacilityID == newitem.FacilityID).Count() == 0 || facPlaces.Count == 0)
                        {

                            if (item.FacilityID == newitem.FacilityID)
                            {
                                //add
                                isset = true;
                                count--;
                                facPlaces.Add(item);
                                continue;
                            }
                            else if (OldPlace.FacilityPlaces.Where(F => F.FacilityID == newitem.FacilityID).Count() == 0)
                            {
                                isset = false;
                                count--;
                                facPlaces.Add(newitem);
                                continue;
                            }
                        }
                    }

                }
                if (!isset)
                {
                    ids.Add(item.ID);
                    // OldPlace.FacilityPlaces.Remove(item);
                }
            }

            OldPlace.Name = Newplace.Name;
            OldPlace.Description = Newplace.Description;
            OldPlace.Capacity = Newplace.Capacity;
            OldPlace.PricePerhour = Newplace.PricePerhour;
            OldPlace.CategoryID = Newplace.CategoryID;
            OldPlace.TypeID = Newplace.TypeID;
            OldPlace.SurfaceID = Newplace.SurfaceID;
            // Location
            OldPlace.Lang = Newplace.Lang;
            OldPlace.Lat = Newplace.Lat;
            OldPlace.City = Newplace.City;
            OldPlace.Street = Newplace.Street;
            // Schedule,Attahcment,facilities
            OldPlace.Schedules = Newplace.Schedules;
            OldPlace.Attachments = Newplace.Attachments;
            OldPlace.ModificationDate = DateTime.Now;
            //OldPlace.FacilityPlaces.Clear();
            if (OldPlace.FacilityPlaces.Count != facPlaces.Count)
            {
                foreach (var item in facPlaces)
                {
                    if (item.ID == 0)
                    {
                        item.PlaceID = OldPlace.ID;
                        OldPlace.FacilityPlaces.Add(item);

                    }
                }
            }
            return ids;
        }
        // For SeemyPlaces
        public static SeemyPlaceViewModel ToMyplacesView(this Place place)
        {
            float RateValuesum = 0;
            foreach (var item in place.OwnerReviews.Select(R => R.RateValue).ToList())
            {
                RateValuesum += item;
            }
            float RateValueavg = RateValuesum / place.OwnerReviews.Select(R => R.RateValue).ToList().Count;
            return new SeemyPlaceViewModel()
            {
                ID = place.ID,
                Name = place.Name,
                PricePerHour = place.PricePerhour,
                RateValue = place.GetPlaceAvgRate(),
                Facilities = place.FacilityPlaces.Select(Fac => Fac.Facility.Name).ToList(),
                Attachments = place.Attachments.Select(A => A.Name).ToList(),
            };
        }
        public static float GetPlaceAvgRate(this Place place)
        {
            float RateValuesum = 0;
            foreach (var item in place.OwnerReviews.Select(R => R.RateValue).ToList())
            {
                RateValuesum += item;
            }
            if (place.OwnerReviews.Select(R => R.RateValue).ToList().Count != 0)
                return RateValuesum / place.OwnerReviews.Select(R => R.RateValue).ToList().Count;
            else
                return 0;
        }
        // Get Distance near than you  note is it ok
        public static bool filterbydistance(this Place place, double lng, double lat, double d)
        {
            double R = 3958.8;
            d = 2 * R * Math.Asin(d);
            double diff = place.haversine_distance(lng, lat);

            if (diff <= d)
                return true;
            else
                return false;
        }
        public static double haversine_distance(this Place place, double lng, double lat)
        {
            //  Function to calaculate between diff distance
            const double R = 3958.8; // Radius of the Earth in miles
            double rlat1 = lat * (Math.PI / 180); // Convert degrees to radians
            double rlat2 = place.Lat * (Math.PI / 180); // Convert degrees to radians
            double difflat = rlat2 - rlat1; // Radian difference (latitudes)
            double difflon = (place.Lang - lng) * (Math.PI / 180); // Radian difference (longitudes)
            double d = 2 * R * Math.Asin(Math.Sqrt(Math.Sin(difflat / 2) * Math.Sin(difflat / 2) + Math.Cos(rlat1) * Math.Cos(rlat2) * Math.Sin(difflon / 2) * Math.Sin(difflon / 2)));
            return d;

        }
        // Get Capacity Number For you place 

        // Get Avaible Place
        public static bool GetAvailablePlace(this Place place, DateTime Avaiabledate)
        {
            var PlaceSchedule = place.Schedules.Select(S => S.ToAddViewModel()).ToList();
            foreach (var placeSchedule in PlaceSchedule)
            {
                var incomeday = Avaiabledate.DayOfWeek.ToString().ToLower();
                if (placeSchedule.Day.ToLower() ==incomeday )
                {
                    if (placeSchedule.EndTime.Hour >= Avaiabledate.Hour && (placeSchedule.EndTime.Hour-placeSchedule.StartTime.Hour)>1)
                    {
                        if (GetCurrentCapacity(place, DateTime.Now) > 0)
                        {
                        return true;
                        }
                        return false;
                    }
                }
                else
                {
                    continue;
                }
            }
            return false;
        }
        public static int GetCurrentCapacity(this Place place, DateTime startTime)
        {
            int CurrentCapacity = place.Capacity;
            if(place.Bookings.Count > 0)
            {
                var bookingList = place.Bookings.Where(B => B.StartTime.Hour == startTime.Hour && B.StartTime.Day == startTime.Day).ToList();
                if (bookingList.Count>0)
                {
                    foreach(var book in bookingList)
                    {
                        CurrentCapacity -= book.Count;
                    }
                }
            }
            return CurrentCapacity;
        }

    }
}
