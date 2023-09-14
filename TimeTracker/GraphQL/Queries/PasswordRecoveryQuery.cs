using DocumentFormat.OpenXml.InkML;
using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.Models;
using TimeTracker.Utils.Email;

namespace TimeTracker.GraphQL.Queries;

public sealed class PasswordRecoveryQuery:ObjectGraphType
{
    public PasswordRecoveryQuery(IUnitOfWorkRepository uow)
    {
        Field<int>("passwordRecovery")
            .Argument<string>("email")
            .ResolveAsync(async context =>
            {
                var email = context.GetArgument<string>("email");

                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == email)??throw new ArgumentException("user not exist");

                
                
                var emailService = context.RequestServices!.GetRequiredService<EmailService>();
                
                var code = Guid.NewGuid();

                var encrypted = BCrypt.Net.BCrypt.HashPassword(code.ToString());

                await uow.GenericRepository<PasswordVerify>().CreateAsync(new PasswordVerify()
                {
                    Code = encrypted,
                    RequestDate = DateTime.Now,
                    UserId = user.Id,
                    User = user
                });
                
                emailService.SendEmail(email,$"<div>{code}</div>","Password recovery");

                await uow.SaveAsync();
                
                return user.Id;
            });

        Field<bool>("verifyCode")
            .Argument<int>("userId")
            .Argument<string>("code")
            .ResolveAsync(async context =>
            {
                var email = context.GetArgument<int>("userId");
                
                var verify = await uow.GenericRepository<PasswordVerify>()
                    .FindAsync(u => u.UserId == email) ?? throw new ArgumentException("user not found");

                var code = context.GetArgument<string>("code");
                
                var isRecovered = BCrypt.Net.BCrypt.Verify(code, verify.Code);
                
                verify.IsRecovered = isRecovered;

                await uow.GenericRepository<PasswordVerify>().UpdateAsync(verify);

                await uow.SaveAsync();
                
                return isRecovered;
            });

        Field<string>("createNewPassword")
            .Argument<string>("password")
            .Argument<int>("userId")
            .ResolveAsync(async context =>
            {
                
                var id = context.GetArgument<int>("userId");
                
                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == id) ?? throw new ArgumentException("user not found");

                var verify = await uow.GenericRepository<PasswordVerify>()
                    .FindAsync(u => u.UserId == id);


                if (!verify.IsRecovered)
                {
                    throw new ArgumentException("Password not verified,try again");
                }
                
                var newPassword = context.GetArgument<string>("password");

                user.Password = BCrypt.Net.BCrypt.HashPassword(newPassword);
                
                
                await uow.SaveAsync();
                
                return "Password reset successfully";
            });
    }
}