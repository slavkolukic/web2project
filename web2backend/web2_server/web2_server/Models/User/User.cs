using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace web2_server.Models
{
    public class User : IdentityUser
    {
        public string Name { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }

        public UserRole Role { get; set; }

        //public ICollection<FriendRequest> Friends { get; set; }

        //public Airline AirlineComnpany { get; set; }
        //public RentCarCompany CarCompany { get; set; }

        //public ICollection<CarReservation> CarReservations { get; set; }
    }
}