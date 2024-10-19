using Microsoft.AspNetCore.Mvc;
using Models;
using System.Net.Mail;
using ViewModel;

namespace webAPP.Controllers
{
    public class UploadController : ControllerBase
    {
        public class Test
        {
            public FormFileCollection AttachmentsFile { get; set; }
            public string test { get;set; }
        }
        //Logic of addedAttachment 
        [HttpPost,DisableRequestSizeLimit]
        public async Task<IActionResult> Index()
        {
            if (Request.HasFormContentType)
            {
                var data = await Request.ReadFormAsync();
                var files = Request.Form.Files;
            }
            //var attachments = Attachments.Upload();
            return new JsonResult(new APIResult<List<string>>
            {
                data = new List<string>(),
                IsSuccceed=true,
                message="You successfully added attachemnts",
                status = 200
            });
        }
    }
}
