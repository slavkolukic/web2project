using Microsoft.AspNetCore.Identity;

namespace web2_server.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public string Password { get; set; }
    }
}