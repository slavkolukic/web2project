using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web2_server.SmtpOptions
{
    public interface IMailer
    {
        Task SendEmailAsync(string email, string subject, string body);
    }
}