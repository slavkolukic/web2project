using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class CarReservationRequestModel
    {
        public DateTime FirstDayOfReservation { get; set; }

        public DateTime LastDayOfReservation { get; set; }

        public string OwnerId { get; set; }

        public int CarId { get; set; }

        public string PricePerDay { get; set; }
    }
}