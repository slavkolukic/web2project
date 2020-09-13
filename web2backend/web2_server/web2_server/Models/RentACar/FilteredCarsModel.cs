using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class FilteredCarsModel
    {
        public string FirstDayOfReservaton { get; set; }

        public string LastDayOfReservaton { get; set; }

        public int PricePerDay { get; set; }

        public string TypeOfCar { get; set; }

        public int NumberOfSeats { get; set; }
    }
}