namespace web2_server.Controllers
{
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.Extensions.Options;
    using Microsoft.IdentityModel.Tokens;
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;
    using web2_server.Database;
    using web2_server.Models;
    using web2_server.Models.Identity;

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

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var retToken = tokenHandler.WriteToken(token);
            return retToken;
        }
    }
}