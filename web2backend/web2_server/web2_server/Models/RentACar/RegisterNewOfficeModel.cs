using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class RegisterNewOfficeModel
    {
        public string Address { get; set; }
        public string City { get; set; }

        public string OwnerId { get; set; }
    }
}