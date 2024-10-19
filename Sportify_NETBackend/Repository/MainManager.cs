using Castle.Components.DictionaryAdapter.Xml;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Drawing.Printing;

namespace Repository
{
    public class MainManager<T> where T : class
    {
        private SportfiyContext MydB;
        private DbSet<T> set;
        public MainManager(SportfiyContext _mydB)
        {
            MydB = _mydB;
            set = MydB.Set<T>();
        }
        public IQueryable<T> GetAll()
        {
            return set.AsQueryable();
        }
        public IQueryable<T> FilterBY(Expression<Func<T, bool>> filtereq, string Order_ColName, bool isAscending)
        {
            var Query = GetAll();
            if (filtereq != null)
            {
                Query = Query.Where(filtereq);
            }
            // Add OrderBy
            Query = Query.OrderBy(Order_ColName, isAscending);
            return Query;
        }
        public IQueryable<T> Pageination(IQueryable<T> Query, int pageSize, int pageIndex)
        {
            if (pageIndex < 1)
            {
                pageIndex = 1;
            }
            //   3 =>    13/6=2.1
            var temp = Query.Count() / Convert.ToDouble(pageSize);
            if (pageIndex > temp + 1)
            {
                pageIndex = 1;
            }
            int ToBeSkiped = (pageIndex - 1)*pageSize;
            return Query.Skip(ToBeSkiped).Take(pageSize);
        }
        public EntityEntry Add(T item)
        {
            return set.Add(item);
            
        }
        public EntityEntry Update(T item)
        {
            return set.Update(item);
        }
        public EntityEntry Remove(T item)
        {
           return set.Remove(item);
        }


    }
}
