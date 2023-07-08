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
    
    public EmailService(EmailTokenService tokenService)
    {
        _tokenService = tokenService;
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
        
        var body = $@"<div style='display:flex;width:100%;height:100%;justify-content:center;align-items:center;flex-direction:column;gap:10px;'>
                   <h2>Click to confirm your email</h2>
                   <a style='padding:15px 20px;background-color:#8ecae6;border-radius:5px;text-decoration:none;color:#14213d;';
                   href='http://localhost:5166/emailVerify/{confirmationLink}'>Confirm email</a>
                    </div>";
        
        SendEmail(user.Email,body,"Email confirmation");
    }

    public void SendAccountRegistration(string email)
    {
        var body = @"<div style='display:flex;justify-content:center;align-items:center;flex-direction:column;'>
                   <h2>Your account is almost ready</h2>
                   <p>Pass additional verification</p>
                   <a style='padding:15px 20px;background-color:#8ecae6;border-radius:5px;text-decoration:none;color:#14213d;' href='http://localhost:5166/login'>Verify me</a>
                   </div>";
        
        SendEmail(email,body,"Account actions required");
    }


   
}