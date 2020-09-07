namespace web2_server.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.Collections.Generic;
    using System.IdentityModel.Tokens.Jwt;
    using System.Linq;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using web2_server.Database;
    using web2_server.Models;
    using web2_server.Models.RentACar;
    using web2_server.Models.User;

    public class UserController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private DatabaseContext _dbContext;

        public UserController(
            UserManager<User> userManager,
            IOptions<AppSettings> appSettings,
            DatabaseContext db)
        {
            this.userManager = userManager;
            this.appSettings = appSettings.Value;
            this._dbContext = db;
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
                    return Ok("User is successfully registered!");
                }

                return BadRequest(result.Errors);
            }
            else
            {
                return BadRequest(new { message = "Email already exist" });
            }
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

            if (owner.RaCCompany != null)
            {
                return Ok(new { message = "User already owns another company!" });
            }

            RentACarCompany rac = new RentACarCompany();
            rac.CompanyName = racAssignmentModel.CompanyName;

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