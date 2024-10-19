using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class PreferredSport
    {
        public int ID { get; set; }
        public virtual User User { set; get; }
        public string UserID { set; get; }
        public virtual Category Category { set; get; }
        public int CategoryID { set; get; }
    }
}