using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using web2_server.Models.RentACar;

namespace web2_server.Models.User
{
    public class User : IdentityUser
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public UserRole Role { get; set; }

        //public ICollection<FriendRequest> Friends { get; set; }

        //public Airline AirlineComnpany { get; set; }
        public RentACarCompany RaCCompany { get; set; }

        //public ICollection<CarReservation> CarReservations { get; set; }
    }
}