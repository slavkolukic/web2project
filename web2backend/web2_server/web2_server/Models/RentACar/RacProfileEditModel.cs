using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class RacProfileEditModel
    {
        public string Description { get; set; }
        public string CompanyName { get; set; }
        public string Adress { get; set; }

        public string PhoneNumber { get; set; }

        public string OwnerId { get; set; }
    }
}