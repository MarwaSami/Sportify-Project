using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ViewModel
{
    public class UpdateProfileViewModel
    {
        public string ID { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
        public int? CategoryID { get; set; }
        public int? SurfaceID { get; set; }
        public float? PricePerSession { get; set; }
        public string? City { get; set; }
        public string? JobTitle { get; set; }
        public string? Description { get; set; }
        public IFormFile? ProfileImage { get; set; }
        public string? ProfileImageUrl { get; set; }
    }

    
}
