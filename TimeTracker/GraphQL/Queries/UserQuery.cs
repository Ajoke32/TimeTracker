using GraphQL;
using GraphQL.Types;
using Microsoft.AspNetCore.Authorization;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Utils.Auth;


namespace TimeTracker.GraphQL.Queries;


public sealed class UserQuery : ObjectGraphType
{
    private readonly IUnitOfWorkRepository _uow;
    

    public UserQuery(IUnitOfWorkRepository uow)
    {
        
        _uow = uow;
        Field<ListGraphType<UserType>>("users")
            .ResolveAsync(async ctx =>
                await uow.GenericRepository<User>().GetAsync()).Description("gets all users")
            .AuthorizeWithPolicy("Read");

        Field<UserType>("user")
            .Argument<int>("id")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("id");
                return await uow.GenericRepository<User>()
                    .FindAsync(u => u.Id == id);
            }).Description("gets user by id");

        Field<UserType>("userByEmail")
            .Argument<string>("email")
            .ResolveAsync(async _ =>
            {
                var email = _.GetArgument<string>("email");
                return await uow.GenericRepository<User>().FindAsync(u => u.Email == email);
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
                    return "user with this email not found";
                }

                if (!BCrypt.Net.BCrypt.Verify(args.Password, searchUser.Password))
                {
                    return "Wrong password";
                }

                var authService = ctx.RequestServices.GetRequiredService<Authenticate>();

                var token = authService.GenerateToken(searchUser);
                
                return token;
            });
    }   
}