using GraphQL;
using GraphQL.Types;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;

namespace TimeTracker.GraphQL.Mutations;

public sealed class UserMutations:ObjectGraphType
{
   
    
    public UserMutations()
    {

        
        Field<UserType>("create")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                var user = ctx.GetArgument<User>("user");
                
                var created = await uow.GenericRepository<User>().CreateAsync(user);
                await uow.SaveAsync();
                return created;
            });

        Field<UserType>("update")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                
                var user = ctx.GetArgument<User>("user");

                var updated = await uow.GenericRepository<User>().UpdateAsync(user);
                await uow.SaveAsync();
                return updated;
            });

        Field<bool>("deleteById")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                var id = ctx.GetArgument<int>("id");
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id);
                var isDeleted = await uow.GenericRepository<User>().DeleteAsync(user);
                await uow.SaveAsync();

                return isDeleted;
            });

        Field<bool>("delete")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();
                var user = ctx.GetArgument<User>("user");
                
                var isDeleted = await uow.GenericRepository<User>().DeleteAsync(user);
                await uow.SaveAsync();
                return isDeleted;
            });
    }
}