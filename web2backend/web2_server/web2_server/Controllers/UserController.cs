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
        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterUserRequestModel model)
        {
            var userExists = await userManager.FindByEmailAsync(model.Email);
            if (userExists == null)
            {
                var newUser = new User()
                {
                    UserName = model.Name,
                    Email = model.Email,
                    Name = model.Name,
                    LastName = model.LastName,
                    PhoneNumber = model.PhoneNumber,
                    City = model.City,
                    Role = UserRole.Registered,
                    EmailConfirmed = false
                };

                var result = await userManager.CreateAsync(newUser, model.Password);
                if (result.Succeeded)
                {
                    var token = await userManager.GenerateEmailConfirmationTokenAsync(newUser);
                    var confirmationLink = Url.Action("ConfirmEmail", "User", new { userId = newUser.Id, token = token }, Request.Scheme);

                    await _mailer.SendEmailAsync(model.Email, "Email verification", confirmationLink);

                    return Ok(new { message = $"Successfully registered! Please confirm registration via email" });
                }

                return Ok(new { message = result.Errors });
            }
            else
            {
                return Ok(new { message = "Email already exists!" });
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (userId == null || token == null)
            {
                return RedirectToAction("index", "home");
            }

            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest(new { message = $"The User ID {userId} is invalid." });
            }

            var result = await userManager.ConfirmEmailAsync(user, token);
            if (result.Succeeded)
            {
                return Ok("Thank you for confirming your email. You are successfully registered!");
            }

            return BadRequest(new { message = $"Email confirmation failed." });
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserRequestModel model)
        {
            if (model.Password == null)
            {
                return BadRequest(new { message = "Bad data" });
            }
            if (model.Password.Length < 6)
            {
                return BadRequest(new { message = "Bad data" });
            }
            var user = await this.userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                return Unauthorized("Email is not registered!");
            }

            //var isEmailConfirmed = await this.userManager.IsEmailConfirmedAsync(user);
            //if (!isEmailConfirmed)
            //{
            //    return Unauthorized("Email is not confirmed!");
            //}

            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized("Wrong password!");
            }

            var token = generateJwtToken(user);

            return Ok(new { token });
        }

        [HttpGet]
        [Route("getAllUsers")]
        public async Task<Object> GetAllUsers()
        {
            List<User> allUsers = _dbContext.Users.ToList();

            return Ok(new { allUsers });
        }

        [HttpGet]
        [Route("getAllCarCompanies")]
        public async Task<Object> GetAllCarCompanies()
        {
            List<RentACarCompany> allCarCompanies = _dbContext.RentACarCompanies.ToList();

            return Ok(new { allCarCompanies });
        }

        [HttpPost]
        [Route("getRacCompanyInfo")]
        public async Task<IActionResult> GetRacCompanyInfo(IdModel racModel) //Koristimo samo da smjestimo id
        {
            RentACarCompany rac = _dbContext.RentACarCompanies.Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
            if (rac != null)
                return Ok(new { rac });
            else
                return Ok(new { rac = "Rent a Car Company with this id does not exist!" });
        }

        [HttpPost]
        [Route("getRacCompanyOffices")]
        public async Task<IActionResult> GetRacCompanyOffices(IdModel racModel) //Koristimo samo da smjestimo id
        {
            RentACarCompany rac = _dbContext.RentACarCompanies.Include(x => x.Offices).Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();
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
            RentACarCompany rac = _dbContext.RentACarCompanies.Include(x => x.Offices).ThenInclude(x => x.Cars).Where(x => x.Id == Int32.Parse(racModel.Id)).SingleOrDefault();

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
        public async Task<IActionResult> GetAllCars() //Koristimo samo da smjestimo id
        {
            List<Car> retCars = _dbContext.Cars.ToList();

            return Ok(new { retCars });
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

            List<Car> allCars = _dbContext.Cars.Include(x => x.CarReservations).ToList();
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
                else if (parsePricePerDay)
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
                else
                {
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
            Car car = _dbContext.Cars.Include(x => x.CarReservations).Where(x => x.Id == carReservationModel.CarId).SingleOrDefault();
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

            return Ok(new { message = "New reservation is successfully added!" });
        }

        [HttpPost]
        [Route("getAllUserCarReservations")]
        public async Task<IActionResult> GetAllUserCarReservations(IdModel userModel)
        {
            User user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == userModel.Id).SingleOrDefault();
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
            User user = _dbContext.Users.Where(x => x.Id == userIdModel.OwnerId).FirstOrDefault();
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
            User user = _dbContext.Users.Where(x => x.Id == profileModel.OwnerId).FirstOrDefault();
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

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()), new Claim("role", user.Role.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var retToken = tokenHandler.WriteToken(token);
            return retToken;
        }
    }
}