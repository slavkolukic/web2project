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

                    return Ok(new { message = $"Please confirm registration via email" });
                }

                return BadRequest(result.Errors);
            }
            else
            {
                return BadRequest(new { message = "Email already exist" });
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

        [HttpPost]
        [Route("newAdmin")]
        public async Task<IActionResult> GiveUserAdminRights(NewAdminModel newAdminModel)
        {
            var userExists = await userManager.FindByEmailAsync(newAdminModel.email);
            if (userExists == null)
            {
                return BadRequest(new { message = "User with given email does not exist!" });
            }

            if (userExists.Role == UserRole.SystemAdmin)
            {
                return Ok(new { message = "User with given email is already admin!" });
            }

            userExists.Role = UserRole.SystemAdmin;

            IdentityResult result = await userManager.UpdateAsync(userExists);
            //await _context.SaveChangesAsync();

            return Ok($"User with email {newAdminModel.email} is now admin");
        }

        [HttpPost]
        [Route("assignRacCompany")]
        public async Task<IActionResult> AssignRacCompanyToUser(RaCAssignmentModel racAssignmentModel)
        {
            var owner = _dbContext.Users.SingleOrDefault(u => u.Email == racAssignmentModel.OwnerEmail);
            if (owner == null)
            {
                return Ok(new { message = "User with given email does not exist!" });
            }

            //if (owner.RaCCompany != null)
            //{
            //    return Ok(new { message = "User already owns another company!" });
            //}

            RentACarCompany rac = new RentACarCompany();
            rac.CompanyName = racAssignmentModel.CompanyName;
            rac.Offices = new Collection<Office>();
            owner.RaCCompany = rac;

            owner.Role = UserRole.CarAdmin;

            _dbContext.SaveChanges();

            return Ok(owner);
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
            if (filteredCarsModel.FirstDayOfReservation == "" || filteredCarsModel.LastDayOfReservation == "")
                parseDates = false;

            bool parseNumberOfSeats = true;
            if (filteredCarsModel.NumberOfSeats == "")
                parseNumberOfSeats = false;

            bool parsePricePerDay = true;
            if (filteredCarsModel.PricePerDay == "")
                parsePricePerDay = false;

            bool parseTypeOfCar = true;
            if (filteredCarsModel.TypeOfCar == "")
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

            bool addCar = true;

            foreach (var car in allCars)
            {
                addCar = true;
                if (Int32.Parse(filteredCarsModel.NumberOfSeats) > car.NumberOfSeats ||
                    Int32.Parse(filteredCarsModel.PricePerDay) > car.PricePerDay ||
                    filteredCarsModel.TypeOfCar != car.TypeOfCar)
                {
                    addCar = false;
                    continue;
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
        public async Task<IActionResult> GetAllUserCarReservations(IdModel userModel) //Koristimo samo da smjestimo id
        {
            User user = _dbContext.Users.Include(x => x.RaCCompany).ThenInclude(x => x.Offices).ThenInclude(x => x.Cars).ThenInclude(x => x.CarReservations).Where(x => x.Id == userModel.Id).SingleOrDefault();
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