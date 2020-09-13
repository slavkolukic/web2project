using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class FilteredCarsModel
    {
        public string FirstDayOfReservation { get; set; }

        public string LastDayOfReservation { get; set; }

        public string PricePerDay { get; set; }

        public string TypeOfCar { get; set; }

        public string NumberOfSeats { get; set; }
    }
}