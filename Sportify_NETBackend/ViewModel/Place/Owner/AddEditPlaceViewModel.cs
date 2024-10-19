using Microsoft.AspNetCore.Http;
using Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ViewModel
{
    // Add Place View
    public class AddEditPlaceViewModel
    {
        public int Id { get; set; } = 0;
        [Required, StringLength(250, MinimumLength = 3)]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int Capacity { get; set; }
        [Required]
        public float PricePerhour { get; set; }
        public double Lang { get; set; } = 0;
        public double Lat { get; set; } = 0;
        public string Street { get; set; } = "";
        public string City { get; set; } = "";
        [Required]
        public int CategoryID { get; set; }
        // dont forgot get id of owner
        public string OwnerID { get; set; } = "";
        [Required]
        public int SurfaceID { get; set; }
        [Required]
        public int TypeID { get; set; }
        public string ModificationBy { get; set; } = "";
        public DateTime ModificationDate { get; set; } = DateTime.Now;
        public bool IsDeleted { get; set; } = false;
        public List<int> Facilities_ids { get; set; } = new List<int>();
        [Required]
        public List<string> SchedulesDay { get; set; }
        [Required]
        public List<DateTime> SchedulesStartTime { get; set; }
        [Required]
        public List<DateTime> SchedulesEndTime { get; set; }
        [Required]
        public List<string> Attachments { get; set; } = new List<string>();
        public FormFileCollection file { get; set; } = new FormFileCollection();
    }
}
