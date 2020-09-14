using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using web2_server.Database;
using web2_server.Models;
using web2_server.Models.RentACar;
using web2_server.Models.User;

namespace web2_server.Controllers
{
    public class AdminController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private DatabaseContext _dbContext;

        public AdminController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            DatabaseContext db)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this._dbContext = db;
        }

        [HttpPost]
        [Route("newAdmin")]
        public async Task<IActionResult> GiveUserAdminRights(NewAdminModel newAdminModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                var userExists = await userManager.FindByEmailAsync(newAdminModel.email);
                if (userExists == null)
                {
                    return Ok(new { message = "User with given email does not exist!" });
                }

                if (userExists.Role == UserRole.SystemAdmin)
                {
                    return Ok(new { message = "User with given email is already admin!" });
                }

                userExists.Role = UserRole.SystemAdmin;

                IdentityResult result = await userManager.UpdateAsync(userExists);
                transaction.Commit();

                return Ok(new { message = $"User with email {newAdminModel.email} is now admin" });
            }
        }

        [HttpPost]
        [Route("assignRacCompany")]
        public async Task<IActionResult> AssignRacCompanyToUser(RaCAssignmentModel racAssignmentModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                var owner = _dbContext.Users.SingleOrDefault(u => u.Email == racAssignmentModel.OwnerEmail);
                if (owner == null)
                {
                    return Ok(new { message = "User with given email does not exist!" });
                }

                if (owner.RaCCompany != null)
                {
                    return Ok(new { message = "User already owns another company!" });
                }

                RentACarCompany rac = new RentACarCompany();
                rac.CompanyName = racAssignmentModel.CompanyName;
                rac.Offices = new Collection<Office>();
                owner.RaCCompany = rac;

                owner.Role = UserRole.CarAdmin;

                _dbContext.SaveChanges();
                transaction.Commit();

                return Ok(new { message = "New rent a car administrator is successfully registered!" });
            }
        }
    }
}