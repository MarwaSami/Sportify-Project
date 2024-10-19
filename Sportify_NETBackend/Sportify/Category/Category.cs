using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class Category
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Pic { get; set; }
        public virtual ICollection<User> Trainers { get; set; }
        public virtual ICollection<Place> Places { get; set; }
        public virtual ICollection<PreferredSport> PreferredSport { get; set; }
        public virtual ICollection<BBlog> Blogs { get; set; }
        public string ModificationBy { get; set; }
        public DateTime ModificationDate { get; set; }
        public bool IsDeleted { get; set; }
       
    }
}
