using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository;
using ViewModel;
namespace webAPP.Controllers
{

    public class ContactUsController : ControllerBase
    {
        private AccountManager accountManager;


        public ContactUsController(AccountManager _accountManager)
        {
            this.accountManager = _accountManager;
        }
        [HttpPost("ContactUs")]
        public IActionResult ContactUs([FromBody] ContactUsViewModel contactUs)
        {
            accountManager.ProcessContactUs(contactUs);

            return Ok();
        }
    }
}
