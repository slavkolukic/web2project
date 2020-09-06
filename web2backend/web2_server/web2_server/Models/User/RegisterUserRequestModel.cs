using System.ComponentModel.DataAnnotations;

namespace web2_server.Models.User
{
    public class RegisterUserRequestModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public string Password { get; set; }
    }
}