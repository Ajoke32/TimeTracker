using AutoMapper;
using GraphQL;
using GraphQL.Execution;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Auth;
using TimeTracker.Utils.Email;


namespace TimeTracker.GraphQL.Queries;


public sealed class UserQuery : ObjectGraphType
{
    private readonly IUnitOfWorkRepository _uow;


    public UserQuery(IUnitOfWorkRepository uow,IMapper mapper)
    {

        _uow = uow;
        Field<ListGraphType<UserType>>("users")
            .Argument<string>("include",nullable:true,configure:c=>c.DefaultValue="")
            .ResolveAsync(async ctx =>
            {
                var include = ctx.GetArgument<string>("include");
                
                var users = await _uow.GenericRepository<User>().GetAsync(includeProperties: include);
                
                return mapper.Map<List<User>,List<UserGetDto>>(users.ToList());
            })
            .Description("gets all users");

        Field<UserType>("user")
            .Argument<int>("id")
            .Argument<string>("include",nullable:true)
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("id");

                var include = _.GetArgument<string?>("include");

                return await _uow.GenericRepository<User>()
                        .FindAsync(u=>u.Id==id,relatedData:include);
                    

            }).Description("gets user by id");

        Field<UserType>("userByEmail")
            .Argument<string>("email")
            .ResolveAsync(async _ =>
            {
                var email = _.GetArgument<string>("email");
                return await _uow.GenericRepository<User>().FindAsync(u => u.Email == email);
            }).AuthorizeWithPolicy(policy:"LoggedIn");

        
        Field<string>("login")
            .Argument<UserLoginInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var args = ctx.GetArgument<User>("user");

                var searchUser = await _uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == args.Email);
                
                if (searchUser == null)
                {
                    throw new ValidationError("Wrong credentials!");
                }

                if (searchUser.IsEmailActivated)
                {
                    var authService = ctx.RequestServices?.GetRequiredService<Authenticate>();

                    return AuthorizeWithActivatedEmail(searchUser, args.Password, authService);
                }

                var emailAuthService = ctx.RequestServices?.GetRequiredService<EmailService>();
                return await AuthorizeWithNoActivatedEmailAsync(searchUser,emailAuthService);
            });

        Field<bool>("verifyEmail")
            .Argument<string>("token")
            .ResolveAsync(async _ =>
            {
                var token = _.GetArgument<string>("token");
                var authEmailService = _.RequestServices?.GetRequiredService<EmailTokenService>();
                
                return await authEmailService.VerifyUserToken(token);
            });
        
    }


    private string AuthorizeWithActivatedEmail(User actualUser,string password,Authenticate authenticate)
    {
        if (!BCrypt.Net.BCrypt.Verify(password, actualUser.Password))
        {
            throw new ValidationError("Wrong credentials!");
        }
        
        var token = authenticate.GenerateToken(actualUser);
        
        return token;
    }

    private async Task<string> AuthorizeWithNoActivatedEmailAsync(User actualUser,EmailService mailService)
    {
        await mailService.SendEmailConfirmationAsync(actualUser);

        return "confirmation email delivered";
    }
}