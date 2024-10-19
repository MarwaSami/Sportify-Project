using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Models;
namespace ViewModel
{
    public static class UserExtenstions
    {
        public static Models.User ToSignUpModel(this UserSignUpViewModel user)
        {
            var img = "defaultpic.png";
            if(user.ProfileImg != null)
            {
                string Path = Directory.GetCurrentDirectory() + "/Content/Images/" + user.ProfileImg.FileName;
                FileStream file = new FileStream(Path, FileMode.Create);
                user.ProfileImg.CopyTo(file);
                file.Position = 0;
                //file.Close();
                img = user.ProfileImg.FileName;
            }
            return new Models.User()
            {
                UserName = user.UserName,
                PhoneNumber = user.PhoneNumber,
                Location = user.City,
                Email = user.Email,
                ProfileImg = img,
                ModificationBy=user.ModificationBy
            };
        }
        public static UserViewModel ToModel(this Models.User entity)
        {
            return new UserViewModel
            {
                ID = entity.Id,
                Name = entity.UserName,
                Image=entity.ProfileImg
            };
        }
    }
}
