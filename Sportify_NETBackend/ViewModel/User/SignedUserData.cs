﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class SignedUserData
    {
        public string Token { get; set; }
        public List<string> Roles { get; set; }
        public string Picture { get; set; }
        public string Name { get; set; }
        public string Massage { get; set; }
    }
}
