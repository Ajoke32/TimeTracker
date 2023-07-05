using GraphQL;
using GraphQL.Execution;
using GraphQL.Types;
using GraphQL.Validation;
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
            .Argument<string>("include",nullable:true,configure:c=>c.DefaultValue="")
            .ResolveAsync(async ctx =>
            {
                var include = ctx.GetArgument<string>("include");
                
                return await _uow.GenericRepository<User>().GetAsync(includeProperties: include);
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

                if (!BCrypt.Net.BCrypt.Verify(args.Password, searchUser.Password) || searchUser == null)
                {
                    throw new ValidationError("Wrong credentials!");
                }

                var authService = ctx.RequestServices?.GetRequiredService<Authenticate>();

                var token = authService?.GenerateToken(searchUser);

                return token;
            });
    }
}