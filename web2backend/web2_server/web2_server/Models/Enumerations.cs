using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models
{
    public enum UserRole { Registered, CarAdmin, AirlineAdmin, SystemAdmin, NonRegistered }

    public enum CarType { SUV, Truck, Van, Sedan, Convertible, Electric }

    public enum CarReservationStatus { Free, Reserved }
}