using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repository;
using System.Security.Claims;
using ViewModel;

namespace webAPP.Controllers
{
  
    public class AccountController : ControllerBase
    {
        private AccountManager accountManager;
        

        public AccountController(AccountManager _accountManager)
        {
            this.accountManager = _accountManager;
        }

        [HttpPost]
        public async Task<IActionResult> SignUp([FromBody]UserSignUpViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await accountManager.SignUP(viewModel);
                if (result.Succeeded)
                {
                    return new JsonResult(new APIResult<string>()
                    {
                        data = "",
                        IsSuccceed = true,
                        message = "You successfully Sign Up",
                        status = 200
                    });
                }
                else
                {
                    return new JsonResult(new APIResult<string>()
                    {
                        data = "",
                        IsSuccceed = false,
                        message = result.Errors.Take(1).FirstOrDefault().ToString(),
                        status = 402
                    });
                }
            }
            return new JsonResult(new APIResult<string>()
            {
                data = "",
                IsSuccceed = false,
                message = "There is an problem occur",
                status = 404
            }); ;
        }

        [HttpPost]
        public async Task<IActionResult> SignIn([FromBody]UserSigninViewModel viewModel)
        {
            if (ModelState.IsValid)
            {
                var result = await accountManager.Signin(viewModel);
                if(!string.IsNullOrEmpty( result.Token))
                    return new JsonResult(new APIResult<SignedUserData>()
                    {
                        data = result,
                        IsSuccceed = true,
                        message = result.Massage,
                        status = 200
                    });
                else
                    return new JsonResult(new APIResult<SignedUserData>()
                    {
                        data = result,
                        IsSuccceed = false,
                        message = result.Massage,
                        status = 400
                    });
                

            }
            else
            {
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = false,
                    message = "There is an error occur",
                    status = 404
                });
            }
        }

        [HttpPost("signout")]
        public IActionResult SignOut()
        {
            HttpContext.SignOutAsync();
            return Ok();
        }

        [Authorize]
        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {

            model.Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var rse =   await accountManager.ChangePassword(model);
            if (rse.Succeeded) {
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "Successfully",
                    status = 404
                });
            }

            return new JsonResult(new APIResult<string>()
            {
                data = "",
                IsSuccceed = false,
                message = "There is an error occur",
                status = 404
            });
        }

        [HttpPut("updateprofile")]
        [Authorize, DisableRequestSizeLimit]
        public async Task<IActionResult> UpdateProfile([FromForm] UpdateUserProfileViewModel model)
        {
            model.Id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (model.ProfileImage != null)
            {
                model.ProfileImageUrl = model.ProfileImage.Uploadone();
            }
            var updateResult = await accountManager.UpdateProfile(model);
            if (!updateResult.Succeeded)
            {
                return BadRequest(updateResult.Errors);
            }

            return Ok();
        }
    }
}
