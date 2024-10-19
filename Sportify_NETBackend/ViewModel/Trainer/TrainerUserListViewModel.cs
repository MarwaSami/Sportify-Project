using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class TrainerUserListViewModel
    {
        public int Id { get; init; }
        public string UserName {  get; set; }
        public string TrainerName {  get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public float Price {  get; set; }
        public Models.Status Status { get; set; }



    }
}
