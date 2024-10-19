using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models;
namespace ViewModel
{
    public class PlaceFilterViewModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<string> Facilities { get; set; }
        public List<string> Attachments { get;set; }
    }
}
