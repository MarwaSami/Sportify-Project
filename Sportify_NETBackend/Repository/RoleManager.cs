using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class CRoleManager :MainManager<IdentityRole>
    {
        private RoleManager<IdentityRole> roleManager;
        public CRoleManager(SportfiyContext myDB, RoleManager<IdentityRole> _roleManager) : base(myDB)
        {
            this.roleManager = _roleManager;
        }
        public async Task<IdentityResult> AddRole(string Name)
        {
            return await this.roleManager.CreateAsync(new IdentityRole(Name));
        }
    }
}
