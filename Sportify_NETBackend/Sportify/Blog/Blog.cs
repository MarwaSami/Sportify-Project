using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class BBlog
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string ModificationBy { get; set; }
        public DateTime ModificationDate { get; set; }
        public virtual Category Category { get; set; }
        public int CategoryID { get; set; }
        public bool IsDeleted { get; set; }
        public string ImgUrl { get; set; }
        public string? Tages { get;set; }

    }
}

