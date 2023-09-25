using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.Enums;
using TimeTracker.Models;
using TimeTracker.Utils.Auth;
using TimeTracker.Utils.Errors;
using Twilio;
using Twilio.Rest.Chat.V2;
using Twilio.Rest.Verify.V2.Service;

namespace TimeTracker.GraphQL.Queries;

public sealed class TwoFactorAuthQuery : ObjectGraphType
{
    public TwoFactorAuthQuery(IConfiguration config,IUnitOfWorkRepository uow)
    {
        var accountSid = config["Authentication:Twilio:ClientSid"]!;
        var authToken = config["Authentication:Twilio:AuthToken"]!;
        var serviceSid = config["Authentication:Twilio:ServiceSid"]!;
        
        Field<string>("sendCode")
            .Argument<string>("to")
            .Argument<string>("authType")
            .Resolve(ctx =>
            {
                var authType = ctx.GetArgument<string>("authType");

                var to = ctx.GetArgument<string>("to");
                
                
                TwilioClient.Init(accountSid, authToken);
                
           
                var verification = VerificationResource.Create(
                    to: to,
                    channel: authType,
                    pathServiceSid: serviceSid
                );
                    
             
                return verification.Status;
            });

        Field<string>("login")
            .Argument<string>("code")
            .Argument<string>("to")
            .Argument<string>("email")
            .ResolveAsync( async ctx =>
            {
                var code = ctx.GetArgument<string>("code");

                var to = ctx.GetArgument<string>("to");

                TwilioClient.Init(accountSid, authToken);

                var verificationCheck = VerificationCheckResource.Create(
                    to: to,
                    code: code,
                    pathServiceSid:serviceSid
                );

                if (verificationCheck.Status != "approved")
                {
                    throw new QueryError(Error.ERR_WRONG_CREDENTIALS);
                }

                var email = ctx.GetArgument<string>("email");
                
                var user = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == email)??throw new QueryError(Error.ERR_WRONG_CREDENTIALS);

                var authenticate = ctx.RequestServices!.GetRequiredService<Authenticate>();
                
                var token = authenticate.GenerateToken(user);
                var refToken = authenticate.GenerateRefreshToken();
                user.RefreshToken = refToken.Token;
                user.RefreshTokenExpiration = refToken.Expiration;
                await uow.SaveAsync();
        
                return token;
            });
        
    }
}