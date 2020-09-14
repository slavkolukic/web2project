using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.User
{
    public class ProfileInfoRequestModel
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public string Email { get; set; }

        public string PhoneNumber { get; set; }

        public string NewPassword { get; set; }

        public string OwnerId { get; set; }
    }
}