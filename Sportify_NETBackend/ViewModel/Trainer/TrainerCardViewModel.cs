using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class TrainerCardViewModel
    {
        public string Id {  get; set; }
        public string UserName { get; set; }
        public string JobTitle { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
        public string CategoryName { get; set; }
        public string Adress { get; set; }
        public string Surface { get; set; }
        public float? PricePerSession {  get; set; }
        public List<SetScheduleDayViewModel> WorkingHours { get; set; }


    }
}
