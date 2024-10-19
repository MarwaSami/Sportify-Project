using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class UserSignUpViewModel
    {
        [Required,StringLength(250,MinimumLength =3)]
        public string UserName { get; set; }
        [Required,EmailAddress]
        public string Email { get; set; }
        public string Password { get; set; }
        public string City { get; set; } = "";
        [Required]
        public string PhoneNumber {  get; set; }
        public string Role { get; set; } = "Customer";
        public string ModificationBy { get; set; } = "Admin FT";
        public IFormFile? ProfileImg { get; set; }= null;

    }
}
