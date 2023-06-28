using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class UserMutations:ObjectGraphType
{
    
    public UserMutations()
    {
        
        /*
        Field<UserType>("create")
            .Argument<NonNullGraphType<UserType>>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                
                var user = ctx.GetArgument<User>("user");
                
                return await uow.GenericRepository<User>().CreateAsync(user);
            });

        Field<UserType>("update")
            .Argument<NonNullGraphType<UserType>>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                
                var user = ctx.GetArgument<User>("user");

                return await uow.GenericRepository<User>().UpdateAsync(user);
            });

        Field<bool>("deleteById")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                var id = ctx.GetArgument<int>("id");
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id);
                return await uow.GenericRepository<User>().DeleteAsync(user);
            });

        Field<bool>("delete")
            .Argument<NonNullGraphType<UserType>>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                var user = ctx.GetArgument<User>("user");
                
                return await uow.GenericRepository<User>().DeleteAsync(user);
            });*/
    }
}