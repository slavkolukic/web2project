namespace web2_server.Controllers
{
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using web2_server.Database;

    using web2_server.Models;
    using web2_server.Models.RentACar;
    using web2_server.Models.User;
    using web2_server.SmtpOptions;

    public class UserController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private DatabaseContext _dbContext;
        private readonly IMailer _mailer;

        public UserController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            DatabaseContext db,
            IMailer mailer)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this._dbContext = db;
            _mailer = mailer;
        }

        [HttpPost]
        [Route("getAllUsers")]
        public async Task<Object> GetAllUsers(UserRoleModel userRoleModel)
        {
            List<User> allUsers = new List<User>();
            if (userRoleModel.Role == UserRole.SystemAdmin.ToString())
            {
                using (var transaction = _dbContext.Database.BeginTransaction())
                {
                    allUsers = _dbContext.Users.ToList();
                    transaction.Commit();
                }
                return Ok(new { allUsers });
            }

            return Unauthorized("Permission required to use this method!");
        }

        [HttpGet]
        [Route("getAllCarCompanies")]
        public async Task<Object> GetAllCarCompanies()
        {
            List<RentACarCompany> allCarCompanies = new List<RentACarCompany>();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                allCarCompanies = _dbContext.RentACarCompanies.ToList();
                transaction.Commit(); ;
            }

            if (allCarCompanies == null)
            {
                return Ok(new { message = "No registrated rent a car company so far!" });
            }

            return Ok(new { allCarCompanies });
        }

        [HttpPost]
        [Route("getRacCompanyRating")]
        public async Task<IActionResult> GetRacCompanyRating(IdModel racModel) //Koristimo samo da smjestimo id
        {
            int retVal = 0;
            RentACarCompany rac = new RentACarCompany();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                rac = _dbContext.RentACarCompanies.Include(x => x.Offices).ThenInclude(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
                transaction.Commit();
            }

            if (rac != null)
            {
                int rating = 0;
                int numberOfRatings = 0;
                foreach (var office in rac.Offices)
                {
                    foreach (var car in office.Cars)
                    {
                        rating += car.CarRating;
                        numberOfRatings += car.NumberOfRatings;
                    }
                }

                if (numberOfRatings != 0)
                    retVal = rating / numberOfRatings;

                return Ok(new { retVal });
            }
            else
                return Ok(new { retVal = "Rent a Car Company with this id does not exist!" });
        }

        [HttpPost]
        [Route("getRacCompanyInfo")]
        public async Task<IActionResult> GetRacCompanyInfo(IdModel racModel) //Koristimo samo da smjestimo id
        {
            RentACarCompany rac = new RentACarCompany();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                rac = _dbContext.RentACarCompanies.Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
                transaction.Commit();
            }

            if (rac != null)
                return Ok(new { rac });
            else
                return Ok(new { rac = "Rent a Car Company with this id does not exist!" });
        }

        [HttpPost]
        [Route("getRacCompanyOffices")]
        public async Task<IActionResult> GetRacCompanyOffices(IdModel racModel) //Koristimo samo da smjestimo id
        {
            RentACarCompany rac = new RentACarCompany();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                rac = _dbContext.RentACarCompanies.Include(x => x.Offices).Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
                transaction.Commit();
            }
            if (rac != null)
            {
                List<Office> retOffices = rac.Offices.ToList();
                return Ok(new { retOffices });
            }
            else
                return Ok(new { retOffices = "Rent a Car Company with this id does not exist!" });
        }

        [HttpPost]
        [Route("getRacCompanyCars")]
        public async Task<IActionResult> GetRacCompanyCars(IdModel racModel) //Koristimo samo da smjestimo id
        {
            RentACarCompany rac = new RentACarCompany();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                rac = _dbContext.RentACarCompanies.Include(x => x.Offices).ThenInclude(x => x.Cars).Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
                transaction.Commit();
            }

            if (rac == null)
            {
                return Ok(new { message = "Rac company does not exist!" });
            }

            List<Car> retCars = new List<Car>();
            if (rac != null)
            {
                foreach (var office in rac.Offices)
                {
                    foreach (var car in office.Cars)
                    {
                        retCars.Add(car);
                    }
                }
                return Ok(new { retCars });
            }
            else
                return Ok(new { retCars = "Rent a Car Company with this id does not exist!" });
        }

        [HttpGet]
        [Route("getAllCars")]
        public async Task<IActionResult> GetAllCars()
        {
            List<Car> retCars = new List<Car>();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                retCars = _dbContext.Cars.ToList();
                transaction.Commit();
            }

            if (retCars == null)
            {
                return Ok(new { retCars = "No added cars!" });
            }
            else
            {
                return Ok(new { retCars });
            }
        }

        [HttpPost]
        [Route("rateService")]
        public async Task<IActionResult> RateService(RateServiceModel rsModel)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                List<Car> allCars = _dbContext.Cars.Include(x => x.CarReservations).ToList();

                foreach (var car in allCars)
                {
                    foreach (var reservation in car.CarReservations)
                    {
                        if (reservation.Id == rsModel.ReservationId)
                        {
                            if (reservation.LastDayOfReservaton > DateTime.Now)
                            {
                                return Ok(new { message = "Cant rate service while reservation is still active!" });
                            }
                            else
                            {
                                car.CarRating += Int32.Parse(rsModel.CarRating);
                                car.NumberOfRatings += 1;
                                _dbContext.SaveChanges();
                                transaction.Commit();

                                return Ok(new { message = "Rating was submited successfully!" });
                            }
                        }
                    }
                }
                return Ok(new { message = "Reservation was not found!" });
            }
        }

        [HttpPost]
        [Route("getFilteredCars")]
        public async Task<IActionResult> GetFilteredCars(FilteredCarsModel filteredCarsModel) //Koristimo samo da smjestimo id
        {
            bool parseDates = true;
            if (filteredCarsModel.FirstDayOfReservation == ""
                || filteredCarsModel.FirstDayOfReservation == null
                || filteredCarsModel.LastDayOfReservation == ""
                || filteredCarsModel.LastDayOfReservation == null)
                parseDates = false;

            bool parseNumberOfSeats = true;
            if (String.IsNullOrEmpty(filteredCarsModel.NumberOfSeats) || filteredCarsModel.NumberOfSeats == "null")
                parseNumberOfSeats = false;

            bool parsePricePerDay = true;
            if (filteredCarsModel.PricePerDay == "null" || String.IsNullOrEmpty(filteredCarsModel.PricePerDay))
                parsePricePerDay = false;

            bool parseTypeOfCar = true;
            if (filteredCarsModel.TypeOfCar == "null" || String.IsNullOrEmpty(filteredCarsModel.TypeOfCar))
                parseTypeOfCar = false;

            DateTime from = new DateTime();
            DateTime to = new DateTime();

            if (parseDates)
            {
                from = Convert.ToDateTime(filteredCarsModel.FirstDayOfReservation);
                to = Convert.ToDateTime(filteredCarsModel.LastDayOfReservation);
            }

            List<Car> allCars = new List<Car>();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                allCars = _dbContext.Cars.Include(x => x.CarReservations).ToList();
                transaction.Commit();
            }

            List<Car> retCars = new List<Car>();

            if (allCars.Count == 0 || allCars == null)
                return Ok(new { retCars });

            bool addCar = true;

            foreach (var car in allCars)
            {
                addCar = true;
                if (parseNumberOfSeats)
                {
                    if (Int32.Parse(filteredCarsModel.NumberOfSeats) > car.NumberOfSeats)
                    {
                        addCar = false;
                        continue;
                    }
                }

                if (parsePricePerDay)
                {
                    if (Int32.Parse(filteredCarsModel.PricePerDay) < car.PricePerDay)
                    {
                        addCar = false;
                        continue;
                    }
                }

                if (parseTypeOfCar)
                {
                    if (filteredCarsModel.TypeOfCar != car.TypeOfCar)
                    {
                        addCar = false;
                        continue;
                    }
                }

                foreach (var reservation in car.CarReservations)
                {
                    if (reservation.FirstDayOfReservaton >= from && reservation.FirstDayOfReservaton <= to)
                    {
                        addCar = false;
                        break;
                    }

                    if (reservation.LastDayOfReservaton >= from && reservation.LastDayOfReservaton <= to)
                    {
                        addCar = false;
                        break;
                    }
                }

                if (addCar)
                {
                    retCars.Add(car);
                }
            }

            return Ok(new { retCars });
        }

        [HttpPost]
        [Route("makeCarReservation")]
        public async Task<IActionResult> MakeCarReservation(CarReservationRequestModel carReservationModel) //Koristimo samo da smjestimo id
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                Car car = _dbContext.Cars.Include(x => x.CarReservations).Where(x => x.Id == carReservationModel.CarId).SingleOrDefault();
                if (car == null)
                {
                    return Ok(new { message = "Car does not exist!" });
                }

                CarReservation cr = new CarReservation();

                DateTime startDate = Convert.ToDateTime(carReservationModel.FirstDayOfReservation);
                DateTime endDate = Convert.ToDateTime(carReservationModel.LastDayOfReservation);

                cr.FirstDayOfReservaton = startDate;
                cr.LastDayOfReservaton = endDate;

                int dayDifference = (endDate.Date - startDate.Date).Days;
                cr.TotalPrice = dayDifference * Int32.Parse(carReservationModel.PricePerDay);
                cr.OwnerId = carReservationModel.OwnerId;

                car.CarReservations.Add(cr);
                _dbContext.SaveChanges();
                transaction.Commit();

                return Ok(new { message = "New reservation is successfully added!" });
            }
        }

        [HttpPost]
        [Route("getAllUserCarReservations")]
        public async Task<IActionResult> GetAllUserCarReservations(IdModel userModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == userModel.Id).SingleOrDefault();
                transaction.Commit();
            }

            if (user != null)
            {
                try
                {
                    var racCompany = user.RaCCompany as RentACarCompany;
                    if (racCompany != null)
                    {
                        var officesCompany = racCompany.Offices.ToList() as List<Office>;
                        if (officesCompany != null)
                        {
                            List<Office> userOffices = user.RaCCompany.Offices.ToList();
                            List<CarReservation> retReservations = new List<CarReservation>();

                            foreach (var office in userOffices)
                            {
                                foreach (var car in office.Cars)
                                {
                                    foreach (var carReservation in car.CarReservations)
                                    {
                                        retReservations.Add(carReservation);
                                    }
                                }
                            }
                            return Ok(new { retReservations });
                        }
                    }
                }
                catch (NullReferenceException nre)
                {
                    return Ok(new { retReservations = "Reservation history is empty!" });
                }
            }
            return Ok(new { retReservations = "There is no user with this id!" });
        }

        [HttpPost]
        [Route("getUserProfileInfo")]
        public async Task<IActionResult> GetUserProfileInfo(UserIdModel userIdModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Where(x => x.Id == userIdModel.OwnerId).FirstOrDefault();
                transaction.Commit();
            }

            if (user != null)
            {
                if (user.Role == UserRole.Registered
                || user.Role == UserRole.SystemAdmin
                || user.Role == UserRole.AirlineAdmin
                || user.Role == UserRole.CarAdmin)
                {
                    return Ok(new { user });
                }
                else
                {
                    return Unauthorized(new { user = "User does not have permission for this method!" });
                }
            }
            else
            {
                return Ok(new { user = "User with this id does not exist!" });
            }
        }

        [HttpPost]
        [Route("saveUserProfileChanges")]
        public async Task<IActionResult> SaveUserProfileChanges(ProfileInfoRequestModel profileModel)
        {
            User user = new User();
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                user = _dbContext.Users.Where(x => x.Id == profileModel.OwnerId).FirstOrDefault();
                transaction.Commit();
            }

            if (user != null)
            {
                if (user.Role == UserRole.Registered
                || user.Role == UserRole.SystemAdmin
                || user.Role == UserRole.AirlineAdmin
                || user.Role == UserRole.CarAdmin)
                {
                    if (profileModel.Email != "null" && !String.IsNullOrEmpty(profileModel.Email))
                    {
                        user.Email = profileModel.Email;
                    }

                    if (profileModel.Name != "null" && !String.IsNullOrEmpty(profileModel.Name))
                    {
                        user.Name = profileModel.Name;
                    }

                    if (profileModel.LastName != "null" && !String.IsNullOrEmpty(profileModel.LastName))
                    {
                        user.LastName = profileModel.LastName;
                    }

                    if (profileModel.PhoneNumber != "null" && !String.IsNullOrEmpty(profileModel.PhoneNumber))
                    {
                        user.PhoneNumber = profileModel.PhoneNumber;
                    }

                    if (profileModel.City != "null" && !String.IsNullOrEmpty(profileModel.City))
                    {
                        user.City = profileModel.City;
                    }

                    if (profileModel.NewPassword != "null" && !String.IsNullOrEmpty(profileModel.NewPassword))
                    {
                        var token = await userManager.GeneratePasswordResetTokenAsync(user);
                        var result = await userManager.ResetPasswordAsync(user, token, profileModel.NewPassword);
                    }

                    _dbContext.SaveChanges();
                    return Ok(new { message = "All changes are successfully saved!" });
                }
                else
                {
                    return Ok(new { message = "User does not have permission for this method!" });
                }
            }
            else
            {
                return Ok(new { message = "User with this id does not exist!" });
            }
        }
    }
}