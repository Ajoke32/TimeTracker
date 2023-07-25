using System.Net;
using System.Net.Mail;
using System.Text;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using TimeTracker.Absctration;
using TimeTracker.Models;

namespace TimeTracker.Utils.Email;

public class EmailService
{
    private readonly EmailTokenService _tokenService;
    private readonly IUnitOfWorkRepository _uow;
    
    public EmailService(EmailTokenService tokenService, IUnitOfWorkRepository uow)
    {
        _tokenService = tokenService;
        _uow = uow;
    }
  
    public void SendEmail(string to,string body,string subject)
    {
        var smtpClient = new SmtpClient
        {
            Host = "smtp.gmail.com",
            Port = 587,
            DeliveryMethod = SmtpDeliveryMethod.Network,
            UseDefaultCredentials = false,
            EnableSsl = true,
            Credentials = new NetworkCredential("time.tackerproj@gmail.com","qyeskibiiegkgili")
        };
        
        var mailMessage = new MailMessage
        {
            From = new MailAddress("time.tackerproj@gmail.com"),
            Subject = subject,
            Body = body,
            IsBodyHtml = true,
        };
        
        mailMessage.To.Add(to);
        
        smtpClient.SendAsync(mailMessage,null);
    }

    public async Task SendAccountRegistrationAsync(int userId, string userEmail)
    {
        var confirmationLink = await _tokenService.GenerateUserEmailTokenAsync(userId);

        var body = $@"
        <div style='width: 100%; font-family: Arial, Helvetica, sans-serif;font-size:22px; margin: 40px auto; text-align:center;'>
            <h2 style='width:fit-content; margin: 15px auto;'>Your account is almost ready!</h2>
            <p style='width:fit-content; margin: 15px auto; '>Pass additional verification:</p>
            <a style='display:block; width:fit-content; margin: auto; padding:10px 15px; background-color:#8ecae6; border-radius:5px; text-decoration:none; color:#14213d;'
                href='https://timetrackerproject.azurewebsites.net/userVerify?verify={confirmationLink}'>Confirm</a>
        </div>";

        SendEmail(userEmail, body, "Account actions required.");
    }

    // public async Task SendEmailConfirmationAsync(string userEmail)
    // {

    // }
}