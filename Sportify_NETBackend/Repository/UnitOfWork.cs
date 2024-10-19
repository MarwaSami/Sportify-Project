using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;

namespace Repository
{
    public class UnitOfWork
    {
        private SportfiyContext dBContext;
        public UnitOfWork(SportfiyContext _dBContext)
        {
            this.dBContext = _dBContext;
        }
        public void commit()
        {
            dBContext.SaveChanges();
        }
    }
}
