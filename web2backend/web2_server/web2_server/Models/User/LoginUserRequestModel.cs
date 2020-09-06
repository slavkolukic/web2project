using System.ComponentModel.DataAnnotations;

namespace web2_server.Models.User
{
    public class LoginUserRequestModel
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}