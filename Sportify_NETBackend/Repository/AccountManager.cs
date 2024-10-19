
using Microsoft.AspNetCore.Identity;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ViewModel;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.DataProtection.Internal;
using System.Runtime.Intrinsics.X86;
using Microsoft.AspNetCore.Mvc;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.Mail;
using System.Net;

namespace Repository
{
    public class AccountManager : MainManager<User>
    {
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;
        private IConfiguration configuration;
        public AccountManager(SportfiyContext context, UserManager<User> _userManager, SignInManager<User> _signInManager,
            IConfiguration _configuration
            ) : base(context)
        {
            this.userManager = _userManager;
            this.signInManager = _signInManager;
            this.configuration = _configuration;
        }



        public void ProcessContactUs(ContactUsViewModel contactUs)
        {
            string name = contactUs.Name;
            string email = contactUs.Email;
            string message = contactUs.Message;

            SendContactUsEmail(name, email, message);
        }

        private void SendContactUsEmail(string name, string email, string message)
        {

            var mailMessage = new MailMessage();
            mailMessage.From = new MailAddress("sender@example.com"); 
            mailMessage.To.Add(new MailAddress(email));
            mailMessage.Subject = "Contact Us Form Submission";
            mailMessage.Body = $"Name: {name}\nEmail: {email}\nMessage: {message}";
            mailMessage.IsBodyHtml = false; 

            var client = new SmtpClient("sandbox.smtp.mailtrap.io", 2525)
            {
                Credentials = new NetworkCredential("6ecff26c8406b7", "83304a61e8f702"),
                EnableSsl = true
            };

            client.Send(mailMessage);
         

        }





        public async Task<IdentityResult> SignUP(UserSignUpViewModel viewModel)
        {

            var user = viewModel.ToSignUpModel();
            var result = await userManager.CreateAsync(user, viewModel.Password);
            if (result.Succeeded)
            {
                result = await userManager.AddToRoleAsync(user, viewModel.Role);
            }
            return result;
        }
        public async Task<SignedUserData> Signin(UserSigninViewModel viewModel)
        {
            var data = new SignedUserData();
            List<Claim> claims = new List<Claim>();
            User user = await userManager.FindByEmailAsync(viewModel.Email);
            if (user != null)
            {
                var roles = await userManager.GetRolesAsync(user);
                var result = await signInManager.PasswordSignInAsync(user, viewModel.Password, viewModel.IsRemembered, true);
                if (result.Succeeded)
                {
                    claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                    if (roles != null)
                    {
                        foreach (var role in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, role));
                        }
                    }
                    JwtSecurityToken securityToken = new JwtSecurityToken(
                        claims: claims,
                        signingCredentials: new SigningCredentials(
                            key: new SymmetricSecurityKey(
                                Encoding.ASCII.GetBytes(this.configuration["JWT:Key"])
                                ),
                            algorithm: SecurityAlgorithms.HmacSha384
                            ),
                        expires: DateTime.Now.AddDays(1)
                        );
                    data.Token = new JwtSecurityTokenHandler().WriteToken(securityToken);
                    data.Roles = roles.ToList();
                    data.Picture = user.ProfileImg;
                    data.Name = user.UserName;
                    return data;
                }
                data.Massage = "invalid Email or Password";
                return data;


            }
            else
            {
                data.Massage = "User is Not Found";
                return data;
            }
        }
        [HttpPost]
        public async Task<IdentityResult> ChangePassword([FromBody] ChangePasswordViewModel model)
        {
            User user = await userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new IdentityResult();
            }

            var changePasswordResult = await userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
            return changePasswordResult;
        }

        [HttpPost]
        public async Task<IdentityResult> UpdateProfile([FromBody] UpdateUserProfileViewModel model)
        {
            User user = await userManager.FindByIdAsync(model.Id);
            if (user == null)
            {
                return new IdentityResult();
            }
            if (model.ProfileImageUrl != "")
            {
            user.ProfileImg = model.ProfileImageUrl;

            }
            user.PhoneNumber = model.PhoneNumber;
            var updateprofileResult = await userManager.UpdateAsync(user);
            return updateprofileResult;
        }


        public async Task<User> Getone(string id)
        {
            User user = await userManager.FindByIdAsync(id);
            return user;
        }


        public async Task<PaginationViewModel<OwnerViewModel>> GetOwners(int pageSize = 20, int pageIndex = 1)
        {
            var users = await userManager.GetUsersInRoleAsync("Owner");

            int SkipNum = (pageIndex - 1) * pageSize;
            var data = users.Skip(SkipNum).Take(pageSize).Select(item => new OwnerViewModel()
            {
                ID = item.Id,
                PhoneNumber = item.PhoneNumber,
                ProfileImg = item.ProfileImg,
                Name = item.UserName,
                PlacesCount = item.Places.Count()
            }).ToList();

            return new PaginationViewModel<OwnerViewModel>()
            {
                data = data,
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = users.Count

            };
        }

        public async Task<PaginationViewModel<CustomerViewModel>> GetCustomer(int pageSize = 20, int pageIndex = 1)
        {

            var users = await userManager.GetUsersInRoleAsync("Customer");
            int SkipNum = (pageIndex - 1) * pageSize;
            var data = users.Skip(SkipNum).Take(pageSize).Select(item => new CustomerViewModel()
            {
                ID = item.Id,
                NationalID = item.NationalID,
                PhoneNumber = item.PhoneNumber,
                ProfileImg = item.ProfileImg,
                Name = item.UserName,
                Location = item.Location
            }).ToList();

            return new PaginationViewModel<CustomerViewModel>()
            {
                data = data,
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = users.Count

            };
        }

        public async Task<PaginationViewModel<TrainerViewModel>> GetTrainer(int pageSize = 20, int pageIndex = 1)
        {
            var users = await userManager.GetUsersInRoleAsync("Trainer");
            int SkipNum = (pageIndex - 1) * pageSize;
            var data = users.Skip(SkipNum).Take(pageSize).Select(item => new TrainerViewModel()
            {
                PhoneNumber = item.PhoneNumber,
                Name = item.UserName,
                CategoryID = item.CategoryID.Value,
                SurfaceID = item.SurfaceID.Value,
                CategoryName = item.Category.Name,
                SurfaceName = item.Surface.Name,
                ProfileImage=item.ProfileImg,
            }).ToList();

            return new PaginationViewModel<TrainerViewModel>()
            {
                data = data,
                pageSize = pageSize,
                pageIndex = pageIndex,
                count = users.Count

            };
        }



        // Counters for all Customers,trainers,Owners
        public async Task<int> GetCustomerCount()
        {
            var customer = await GetCustomer();
            return customer.count;
        }
        public async Task<int> GetOwnerCount()
        {
            var owner = await GetOwners();
            return owner.count;
        }
        public async Task<int> GetTrainerCount()
        {
            var trainer = await GetTrainer();
            return trainer.count;
        }
     
    }
}
