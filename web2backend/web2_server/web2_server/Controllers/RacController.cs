using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using web2_server.Database;
using web2_server.Models.RentACar;
using web2_server.Models.User;
using System.Data.Entity;
using web2_server.Models;

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
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == racProfileEditModel.OwnerId); //nece da radi bez include
                if (user == null)
                {
                    return Ok(new { message = "User with given id is not registered!" });
                }

                if (user.Role.ToString() != UserRole.CarAdmin.ToString())
                {
                    return Unauthorized(new { message = "User does not have permission to use this method!" });
                }
                RentACarCompany comp = _dbContext.RentACarCompanies.Where(x => x.Id == user.RaCCompany.Id).SingleOrDefault();

                if (comp == null)
                {
                    return Ok(new { message = "Rent a car company does not exist!" });
                }

                if (racProfileEditModel.CompanyName != "")
                    comp.CompanyName = racProfileEditModel.CompanyName;

                if (racProfileEditModel.Adress != "")
                    comp.Adress = racProfileEditModel.Adress;

                if (racProfileEditModel.Description != "")
                    comp.Description = racProfileEditModel.Description;

                if (racProfileEditModel.PhoneNumber != "")
                    comp.PhoneNumber = racProfileEditModel.PhoneNumber;

                _dbContext.SaveChanges();
                transaction.Commit();
            }

            return Ok(new { message = "Rac profile is successfully updated!" });
        }

        [HttpPost]
        [Route("getRacProfileInfo")]
        public async Task<IActionResult> GetRacProfileInfo(UserIdModel userIdModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == userIdModel.OwnerId); //nece da radi bez include

                if (user == null)
                {
                    return Ok("User with given id is not registered!");
                }

                if (user.Role.ToString() != UserRole.CarAdmin.ToString())
                {
                    return Unauthorized("User does not have permission to use this method!");
                }

                RentACarCompany racCompany = _dbContext.RentACarCompanies.Where(x => x.Id == user.RaCCompany.Id).SingleOrDefault();

                if (racCompany == null)
                {
                    return Ok("Rent a car company does not exist!");
                }

                transaction.Commit();
                return Ok(new { racCompany });
            }
        }

        [HttpPost]
        [Route("registerNewOffice")]
        public async Task<IActionResult> RegisterNewOffice(RegisterNewOfficeModel registerNewOfficeModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == registerNewOfficeModel.OwnerId);
                if (user == null)
                {
                    return Ok(new { message = "User with given id is not registered!" });
                }

                if (user.Role.ToString() != UserRole.CarAdmin.ToString())
                {
                    return Unauthorized(new { message = "User does not have permission to use this method!" });
                }

                RentACarCompany racCompany = _dbContext.RentACarCompanies.Include(x => x.Offices).SingleOrDefault(x => x.Id == user.RaCCompany.Id);

                if (racCompany == null)
                {
                    return Ok(new { message = "Rent a car company does not exist!" });
                }

                Office newOffice = new Office();
                newOffice.Address = registerNewOfficeModel.Address;
                newOffice.City = registerNewOfficeModel.City;
                newOffice.Cars = new Collection<Car>();

                racCompany.Offices.Add(newOffice);

                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new { message = "New office is successfully registered!" });
            }
        }

        [HttpPost]
        [Route("getUserOffices")]
        public async Task<IActionResult> GetUserOffices(UserIdModel userIdModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                User user = _dbContext.Users.Include(c => c.RaCCompany).SingleOrDefault(c => c.Id == userIdModel.OwnerId);

                if (user == null)
                {
                    return Ok("User with given id is not registered!");
                }

                if (user.Role.ToString() != UserRole.CarAdmin.ToString())
                {
                    return Unauthorized("User does not have permission to use this method!");
                }

                RentACarCompany racCompany = _dbContext.RentACarCompanies.Include(x => x.Offices).SingleOrDefault(x => x.Id == user.RaCCompany.Id);
                if (racCompany == null)
                {
                    return Ok("Rent a car company does not exist!");
                }

                //List<Office> allOffices = _dbContext.Offices.Where(x => x)
                List<Office> allOffices = racCompany.Offices.ToList();

                transaction.Commit();
                return Ok(new { allOffices });
            }
        }

        [HttpPost]
        [Route("deleteOffice")]
        public async Task<IActionResult> DeleteOffice(IdModel officeIdModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Office officeToRemove = _dbContext.Offices.Include(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == Int32.Parse(officeIdModel.Id)).SingleOrDefault();
                if (officeToRemove == null)
                {
                    return Ok(new { message = "Office does not exist!" });
                }
                _dbContext.Offices.Remove(officeToRemove);
                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new { message = "Office is successfully deleted!" });
            }
        }

        [HttpPost]
        [Route("getOfficeInfo")]
        public async Task<IActionResult> GetOfficeInfo(IdModel officeIdModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Office officeInfo = _dbContext.Offices.Where(x => x.Id == Int32.Parse(officeIdModel.Id)).SingleOrDefault();
                transaction.Commit();
                if (officeInfo == null)
                {
                    return Ok(new { message = "Office does not exist!" });
                }

                return Ok(new { officeInfo });
            }
        }

        [HttpPost]
        [Route("editOfficeInfo")]
        public async Task<IActionResult> EditOfficeInfo(Office officeModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Office officeInfo = _dbContext.Offices.Where(x => x.Id == officeModel.Id).SingleOrDefault();

                if (officeInfo == null)
                {
                    return Ok(new { message = "Office does not exist!" });
                }

                if (officeModel.Address != "")
                    officeInfo.Address = officeModel.Address;

                if (officeModel.City != "")
                    officeInfo.City = officeModel.City;

                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new { message = "Office is successfully updated!" });
            }
        }

        [HttpPost]
        [Route("addNewCar")]
        public async Task<IActionResult> AddNewCar(NewCarModel newCarModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Office carOffice = _dbContext.Offices.Include(x => x.Cars).Where(x => x.Id == newCarModel.OfficeId).SingleOrDefault();
                if (carOffice == null)
                {
                    return Ok(new { message = "Office does not exist!" });
                }
                Car newCar = new Car();
                newCar.CarReservations = new Collection<CarReservation>();
                newCar.Model = newCarModel.Model;
                newCar.Brand = newCarModel.Brand;
                newCar.Year = newCarModel.Year;
                newCar.TypeOfCar = newCarModel.TypeOfCar;
                newCar.NumberOfSeats = newCarModel.NumberOfSeats;
                newCar.PricePerDay = newCarModel.PricePerDay;

                carOffice.Cars.Add(newCar);

                await _dbContext.SaveChangesAsync();
                transaction.Commit();
                return Ok(new { message = "Car is successfully added!" });
            }
        }

        [HttpPost]
        [Route("getAllUserCars")]
        public async Task<IActionResult> GetAllUserCars(UserIdModel userIdModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).Where(x => x.Id == userIdModel.OwnerId).ToList().First();
                transaction.Commit();
            }

            if (user == null)
            {
                return Ok("User with given id is not registered!");
            }

            if (user.Role.ToString() != UserRole.CarAdmin.ToString())
            {
                return Unauthorized("User does not have permission to use this method!");
            }

            List<Car> allCars = new List<Car>();

            foreach (var office in user.RaCCompany.Offices)
            {
                foreach (var car in office.Cars)
                {
                    allCars.Add(car);
                }
            }
            return Ok(new { allCars });
        }

        [HttpPost]
        [Route("getCarInfo")]
        public async Task<IActionResult> GetCarInfo(IdModel officeIdModel) //koristim officeIdModel da ne bih pravio i za auto
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Car carInfo = _dbContext.Cars.Where(x => x.Id == Int32.Parse(officeIdModel.Id)).SingleOrDefault();
                if (carInfo == null)
                {
                    return Ok("Car does not exist!");
                }
                transaction.Commit();
                return Ok(new { carInfo });
            }
        }

        [HttpPost]
        [Route("editCarInfo")]
        public async Task<IActionResult> EditCarInfo(Car carModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Car carInfo = _dbContext.Cars.Where(x => x.Id == carModel.Id).SingleOrDefault();

                if (carInfo == null)
                {
                    return Ok(new { message = "Car does not exist!" });
                }

                if (carModel.Brand != "")
                    carInfo.Brand = carModel.Brand;

                if (carModel.Model != "")
                    carInfo.Model = carModel.Model;

                if (carModel.Year.ToString() != "")
                    carInfo.Year = carModel.Year;

                if (carModel.TypeOfCar != "")
                    carInfo.TypeOfCar = carModel.TypeOfCar;

                if (carModel.NumberOfSeats.ToString() != "")
                    carInfo.NumberOfSeats = carModel.NumberOfSeats;

                if (carModel.PricePerDay.ToString() != "")
                    carInfo.PricePerDay = carModel.PricePerDay;

                _dbContext.SaveChanges();
                transaction.Commit();
                return Ok(new { message = "Car is successfully updated!" });
            }
        }

        [HttpPost]
        [Route("deleteCar")]
        public async Task<IActionResult> DeleteCar(IdModel carModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Car carToRemove = _dbContext.Cars.Include(x => x.CarReservations).Where(x => x.Id == Int32.Parse(carModel.Id)).SingleOrDefault();
                if (carToRemove != null)
                {
                    _dbContext.Cars.Remove(carToRemove);
                    _dbContext.SaveChanges();
                    transaction.Commit();
                    return Ok(new { message = "Car is successfully deleted!" });
                }

                return Ok(new { message = "There is no car with given ID" });
            }
        }

        [HttpPost]
        [Route("getServiceRating")]
        public async Task<IActionResult> GetServiceRating(UserIdModel userIdModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).Where(x => x.Id == userIdModel.OwnerId).ToList().First();
                transaction.Commit();
            }

            if (user == null)
            {
                return Ok("User does not exist!");
            }

            if (user.Role.ToString() != UserRole.CarAdmin.ToString())
            {
                return Unauthorized("User does not have permission to use this method!");
            }

            int overallRatingSum = 0;
            int ratingsCount = 0;

            foreach (var office in user.RaCCompany.Offices)
            {
                foreach (var car in office.Cars)
                {
                    overallRatingSum += car.CarRating;
                    ratingsCount += car.NumberOfRatings;
                }
            }

            if (ratingsCount != 0)
            {
                int retVal = overallRatingSum / ratingsCount;
                return Ok(new { retVal });
            }
            else
            {
                return Ok(new { retVal = "0" });
            }
        }

        [HttpPost]
        [Route("getAllCarEarnings")]
        public async Task<IActionResult> GetAllCarEarnings(UserIdModel userIdModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == userIdModel.OwnerId).SingleOrDefault();
                transaction.Commit();
            }

            if (user == null)
            {
                return Ok("User does not exist!");
            }

            List<Office> userOffices = user.RaCCompany.Offices.ToList();

            if (userOffices == null)
            {
                return Ok("Offices do not exist!");
            }
            int retVal = 0;

            foreach (var office in userOffices)
            {
                foreach (var car in office.Cars)
                {
                    foreach (var carReservation in car.CarReservations)
                    {
                        retVal += carReservation.TotalPrice;
                    }
                }
            }

            return Ok(new { retVal });
        }
    }
}