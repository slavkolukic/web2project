using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.Models.RentACar
{
    public class Office
    {
        [Key]
        public int Id { get; set; }

        public string Address { get; set; }
        public string City { get; set; }

        public ICollection<Car> Cars { get; set; }
    }
}