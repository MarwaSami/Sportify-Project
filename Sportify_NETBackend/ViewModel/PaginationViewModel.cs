using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class PaginationViewModel<T> where T :class
    {
        public List<T> data { get; set; }
        public int pageSize { get; set; } = 20;
        public int pageIndex { get; set; } = 1;
        public int count { get; set; } = 20;
    }
}
