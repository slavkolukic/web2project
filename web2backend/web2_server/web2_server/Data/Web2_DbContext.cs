using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using web2_server.Models;

namespace web2_server.Data
{
    public class Web2_DbContext : IdentityDbContext<User>
    {
        public Web2_DbContext(DbContextOptions<Web2_DbContext> options) : base(options)
        {
        }
    }
}