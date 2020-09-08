﻿using Microsoft.AspNetCore.Identity;
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

            if (racProfileEditModel.CompanyName != "")
                comp.CompanyName = racProfileEditModel.CompanyName;

            if (racProfileEditModel.Adress != "")
                comp.Adress = racProfileEditModel.Adress;

            if (racProfileEditModel.Description != "")
                comp.Description = racProfileEditModel.Description;

            if (racProfileEditModel.PhoneNumber != "")
                comp.PhoneNumber = racProfileEditModel.PhoneNumber;

            await _dbContext.SaveChangesAsync();

            return Ok("Rac profile is successfully updated!");
        }

        [HttpPost]
        [Route("getRacProfileInfo")]
        public async Task<IActionResult> GetRacProfileInfo(UserIdModel userIdModel)
        {
            User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == userIdModel.OwnerId); //nece da radi bez include
            RentACarCompany racCompany = _dbContext.RentACarCompanies.Where(x => x.Id == user.RaCCompany.Id).SingleOrDefault();

            return Ok(new { racCompany });
        }

        [HttpPost]
        [Route("registerNewOffice")]
        public async Task<IActionResult> RegisterNewOffice(RegisterNewOfficeModel registerNewOfficeModel)
        {
            User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == registerNewOfficeModel.OwnerId);
            //RentACarCompany racCompany = _dbContext.RentACarCompanies.Where(x => x.Id == user.RaCCompany.Id).SingleOrDefault();
            RentACarCompany racCompany = _dbContext.RentACarCompanies.Include(x => x.Offices).SingleOrDefault(x => x.Id == user.RaCCompany.Id);
            Office newOffice = new Office();
            newOffice.Address = registerNewOfficeModel.Address;
            newOffice.City = registerNewOfficeModel.City;

            racCompany.Offices.Add(newOffice);

            await _dbContext.SaveChangesAsync();

            return Ok("New office is successfully registered!");
        }

        [HttpPost]
        [Route("getUserOffices")]
        public async Task<IActionResult> GetUserOffices(UserIdModel userIdModel)
        {
            User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == userIdModel.OwnerId);
            RentACarCompany racCompany = _dbContext.RentACarCompanies.Include(x => x.Offices).SingleOrDefault(x => x.Id == user.RaCCompany.Id);
            //List<Office> allOffices = _dbContext.Offices.Where(x => x)
            List<Office> allOffices = racCompany.Offices.ToList();
            return Ok(new { allOffices });
        }

        [HttpPost]
        [Route("deleteOffice")]
        public async Task<IActionResult> DeleteOffice(OfficeIdModel officeIdModel)
        {
            Office officeToRemove = _dbContext.Offices.Where(x => x.Id == Int32.Parse(officeIdModel.Id)).SingleOrDefault();
            _dbContext.Offices.Remove(officeToRemove);
            await _dbContext.SaveChangesAsync();
            return Ok("Office is successfully deleted!");
        }

        [HttpPost]
        [Route("getOfficeInfo")]
        public async Task<IActionResult> GetOfficeInfo(OfficeIdModel officeIdModel)
        {
            Office officeInfo = _dbContext.Offices.Where(x => x.Id == Int32.Parse(officeIdModel.Id)).SingleOrDefault();

            return Ok(new { officeInfo });
        }

        [HttpPost]
        [Route("editOfficeInfo")]
        public async Task<IActionResult> EditOfficeInfo(Office officeModel)
        {
            Office officeInfo = _dbContext.Offices.Where(x => x.Id == officeModel.Id).SingleOrDefault();

            if (officeModel.Address != "")
                officeInfo.Address = officeModel.Address;

            if (officeModel.City != "")
                officeInfo.City = officeModel.City;

            await _dbContext.SaveChangesAsync();

            return Ok("Office is successfully updated!");
        }
    }
}