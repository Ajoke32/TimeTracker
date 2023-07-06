using AutoMapper;
using GraphQL;
using GraphQL.Types;
using GraphQL.Validation;
using TimeTracker.Absctration;
using TimeTracker.GraphQL.Types;
using TimeTracker.GraphQL.Types.InputTypes;
using TimeTracker.Models;
using TimeTracker.Models.Dtos;
using TimeTracker.Utils.Email;

namespace TimeTracker.GraphQL.Mutations;

public sealed class UserMutations:ObjectGraphType
{
   
    
    public UserMutations(IMapper mapper,EmailService emailService)
    {


        Field<bool>("create")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var uow = ctx.RequestServices.GetRequiredService<IUnitOfWorkRepository>();

                var user = ctx.GetArgument<UserInputDto>("user");

                var email = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == user.Email);

                if (email != null)
                {
                    throw new ValidationError("User with this email already exists!");
                }

                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
                
                var created = await uow.GenericRepository<User>().CreateAsync(mapper.Map<User>(user));

                await uow.SaveAsync();
                emailService.SendAccountRegistration(created.Email);
                return true;
            });//.AuthorizeWithPolicy("Create");

        Field<UserType>("update")
            .Argument<UpdateUserInputType>("user")
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
            .Argument<UpdateUserInputType>("user")
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