using Microsoft.EntityFrameworkCore;
using web2_server.Models.RentACar;
using web2_server.Models.User;
using System.Data.Entity;

namespace web2_server.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        { }

        public DbSet<User> Users { get; set; }

        public DbSet<RentACarCompany> RentACarCompanies { get; set; }

        public DbSet<Car> Cars { get; set; }

        public DbSet<Office> Offices { get; set; }
    }
}