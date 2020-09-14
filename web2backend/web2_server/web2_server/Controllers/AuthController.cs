using Microsoft.AspNetCore.Authorization;
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
using web2_server.Models.User;
using web2_server.SmtpOptions;

namespace web2_server.Controllers
{
    public class AuthController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly AppSettings appSettings;
        private DatabaseContext _dbContext;
        private readonly IMailer _mailer;

        public AuthController(
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
            using (var transaction = _dbContext.Database.BeginTransaction())
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
                        var confirmationLink = Url.Action("ConfirmEmail", "Auth", new { userId = newUser.Id, token = token }, Request.Scheme);

                        await _mailer.SendEmailAsync(model.Email, "Email verification", confirmationLink);
                        transaction.Commit();
                        return Ok(new { message = $"Successfully registered! Please confirm registration via email" });
                    }
                    transaction.Commit();
                    return Ok(new { message = result.Errors });
                }
                else
                {
                    transaction.Commit();
                    return Ok(new { message = "Email already exists!" });
                }
            }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
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
                transaction.Commit();
                if (result.Succeeded)
                {
                    return Ok(new { message = "Thank you for confirming your email. You are successfully registered!" });
                }

                return BadRequest(new { message = $"Email confirmation failed." });
            }
        }

        [HttpPost]
        [Route(nameof(Login))]
        public async Task<ActionResult<string>> Login(LoginUserRequestModel model)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
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

                //KOMENTARISATI KAKO BI SE ULOGOVALi
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
                transaction.Commit();
                return Ok(new { token });
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