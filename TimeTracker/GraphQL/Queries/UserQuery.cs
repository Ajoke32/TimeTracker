using AutoMapper;
using GraphQL;
using GraphQL.Execution;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.Enums;
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
                
                var users = await uow.GenericRepository<User>()
                    .GetAsync(includeProperties: include);
                
                return mapper.Map<List<User>,List<UserDisplayDto>>(users.ToList());
            })
            .Description("gets all users");

        Field<UserType>("user")
            .Argument<int>("id")
            .Argument<string>("include",nullable:true)
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("id");

                var include = _.GetArgument<string?>("include");
                
                
                var user = await uow.GenericRepository<User>()
                    .FindAsync(u=>u.Id==id,relatedData:include);
                
               return mapper.Map<UserDisplayDto>(user);

            }).Description("gets user by id");

        Field<UserType>("userByEmail")
            .Argument<string>("email")
            .ResolveAsync(async _ =>
            {
                var email = _.GetArgument<string>("email");
               
                var user = await uow.GenericRepository<User>().FindAsync(u => u.Email == email);
                
                return mapper.Map<UserDisplayDto>(user);
            });//.AuthorizeWithPolicy(policy:"LoggedIn");

        
        Field<LoginResponseType>("login")
            .Argument<UserLoginInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var args = ctx.GetArgument<User>("user");

                var searchUser = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == args.Email);
                
                if (searchUser == null||searchUser.IsDeleted)
                {
                    throw new ValidationError("Wrong credentials!");
                }
                
                
                if (!searchUser.IsEmailActivated) throw new ValidationError("Account is not activated!");
                
                
                var authService = ctx.RequestServices?.GetRequiredService<Authenticate>();
                    
                return await AuthorizeConfirmedEmailAsync(searchUser, args.Password, authService!);

            });

        Field<bool>("verifyUser")
            .Argument<string>("token")
            .ResolveAsync(async _ =>
            {
                var token = _.GetArgument<string>("token");
                var authEmailService = _.RequestServices?.GetRequiredService<EmailTokenService>();
                
                var result =  await authEmailService!.VerifyUserToken(token, 18000); //5 hours

                if (!result)
                {
                    throw new  ValidationError("Invalid token");
                }

                return true;
            });

        Field<string>("refreshToken")
            .Argument<int>("userId")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("userId");
                var user = await _uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == id);

                if (user == null)
                {
                    return "User not found";
                }
                var authService = _.RequestServices?.GetRequiredService<Authenticate>();
                
                return authService!.RefreshToken(user);
            });

    }


    private async Task<LoginResponse> AuthorizeConfirmedEmailAsync(User actualUser,string password,Authenticate authenticate)
    {
        if (!BCrypt.Net.BCrypt.Verify(password, actualUser.Password))
        {
            throw new ValidationError("Wrong credentials!");
        }
        
        var token = authenticate.GenerateToken(actualUser);
        var refToken = authenticate.GenerateRefreshToken();
        actualUser.RefreshToken = refToken.Token;
        actualUser.RefreshTokenExpiration = refToken.Expiration;
        await _uow.SaveAsync();
        
        return new LoginResponse
        {
            Code = (int)AuthCode.Token,
            Message = token
        };
    }

    private async Task<LoginResponse> AuthorizeWithNoActivatedEmailAsync(User actualUser,EmailService mailService,string password)
    {
        actualUser.Password = BCrypt.Net.BCrypt.HashPassword(password);
        await _uow.SaveAsync();
        
        await mailService.SendEmailConfirmationAsync(actualUser);

        return new LoginResponse
        {
            Code = (int)AuthCode.EmailDelivered,
            Message = "email delivered"
        };
    }
}