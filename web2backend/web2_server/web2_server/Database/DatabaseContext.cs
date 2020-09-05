using Microsoft.EntityFrameworkCore;
using web2_server.Models;

namespace web2_server.Database
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        { }

        public DbSet<User> Users { get; set; }
    }
}