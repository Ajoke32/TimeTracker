using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Queries;

public sealed class UserQuery : ObjectGraphType
{
    private readonly IUnitOfWorkRepository _uow;
    
    public UserQuery(IUnitOfWorkRepository uow)
    {
        
        _uow = uow;
        Field<ListGraphType<UserType>>("users")
            .ResolveAsync(async ctx =>
                await uow.GenericRepository<User>().GetAsync()).Description("gets all users");

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
                return await uow.GenericRepository<User>().FindAsync(u => u.Email==email);
            });
        
        
    }   
}