using Microsoft.AspNetCore.Http;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class PlaceAttachmentManager:MainManager<PlaceAttachments>
    {
        public PlaceAttachmentManager(SportfiyContext mydB) : base(mydB)
        { }
     

    }
}
