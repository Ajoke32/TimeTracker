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


    public async Task SendEmailConfirmationAsync(User user)
    {
        var confirmationLink = await _tokenService.GenerateUserEmailTokenAsync(user.Id);
        
        var body = $@"<div style='width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;'>
                   <h2>Click to confirm your email</h2>
                   <a style='padding:15px 20px;background-color:#8ecae6;border-radius:5px;text-decoration:none;color:#14213d;'
                   href='https://timetrackerproj.azurewebsites.net/userVerify?token={confirmationLink}'>Confirm email</a>
                    </div>";
        
        SendEmail(user.Email,body,"Email confirmation");
    }

    public async Task SendAccountRegistrationAsync(int userId, string userEmail)
    {
        var confirmationLink = await _tokenService.GenerateUserEmailTokenAsync(userId);

        var body = $@"<div style='display:flex;align-items:center;flex-direction:column;width:100%;'>
                    <h2>Your account is almost ready</h2>
                    <p>Pass additional verification:</p>
                    <a style='padding:15px 20px;background-color:#8ecae6;border-radius:5px;text-decoration:none;color:#14213d;' href='https://timetrackerproj.azurewebsites.net/userVerify?verify={confirmationLink}'>Verify me</a>
                    </div>";

        SendEmail(userEmail, body, "Account actions required");
    } 
}