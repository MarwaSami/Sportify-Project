using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;
using System.Security.Claims;
using ViewModel;

namespace webAPP
{
    public class RoleController : ControllerBase
    {
        private CRoleManager roleManager;
        public RoleController(CRoleManager _roleManager)
        {
            roleManager = _roleManager;
        }
        [HttpPost("Role/Add/{Name}")]
        public async Task<IActionResult> Add(string Name)
        {
            var result = await roleManager.AddRole(Name);
            if (result.Succeeded)
            {

                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = true,
                    message = "You successfully Add Role",
                    status = 200
                });
            }
            else
            {
                return new JsonResult(new APIResult<string>()
                {
                    data = "",
                    IsSuccceed = false,
                    message = $"There an error : {result.Errors.FirstOrDefault()}",
                    status = 404
                });
            }
        }
    }
}
