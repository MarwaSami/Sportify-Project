﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class UserSigninViewModel
    {
        [Required]
        public string Email {  get; set; }
        [Required]
        public string Password { get; set; }
        public bool IsRemembered { get; set; }=false;
    }
}
