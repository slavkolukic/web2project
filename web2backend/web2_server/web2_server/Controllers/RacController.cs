using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using web2_server.Database;
using web2_server.Models.RentACar;
using web2_server.Models.User;

namespace web2_server.Controllers
{
    public class RacController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private DatabaseContext _dbContext;

        public RacController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            DatabaseContext db)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this._dbContext = db;
        }

        [HttpPost]
        [Route("saveRacProfileChanges")]
        public async Task<IActionResult> SaveRacProfileChanges(RacProfileEditModel racProfileEditModel)
        {
            User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == racProfileEditModel.OwnerId); //nece da radi bez include
            RentACarCompany comp = _dbContext.RentACarCompanies.Where(x => x.Id == user.RaCCompany.Id).SingleOrDefault();

            comp.CompanyName = racProfileEditModel.CompanyName;
            comp.Adress = racProfileEditModel.Adress;
            comp.Description = racProfileEditModel.Description;
            comp.PhoneNumber = racProfileEditModel.PhoneNumber;

            await _dbContext.SaveChangesAsync();

            return Ok("Rac profile is successfully updated!");
        }
    }
}