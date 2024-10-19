using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public static class PlaceHelper
    {
        //public static Expression<Func<Place, bool>> GetAvaiblePlace(this Place place,DateTime date,int count)
        //{
        //    if (place == null)
        //        throw new ArgumentNullException(nameof(place));
        //    if(place.Bookings == null)
        //    {
        //        return place=>place.Schedules.Any(S=>S.StartTime==date);

        //    }
        //    else
        //    {
        //        int Avaiblecount=place.Bookings.Where(B=>B.StartTime==date).Select(B=>B.Count).Count();
        //        if (Avaiblecount >= count)
        //        {
        //            return place => 
        //        }
        //    }
    
        //}
    }
}
