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
   
    
    public UserMutations(IMapper mapper,EmailService emailService,IUnitOfWorkRepository uow)
    {


        Field<int>("create")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {

                var user = ctx.GetArgument<UserInputDto>("user");
                if (!EmailValidation.IsValidEmail(user.Email))
                {
                    throw new ValidationError("invalid email format");
                }
                
                var email = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == user.Email);

                if (email != null)
                {
                    throw new ValidationError("User with this email already exists!");
                }
                
                
                var created = await uow.GenericRepository<User>().CreateAsync(mapper.Map<User>(user));

                await uow.SaveAsync();

                await emailService.SendAccountRegistrationAsync(created.Id, created.Email);
                return created.Id;
            });//.AuthorizeWithPolicy("Create");

        Field<UserType>("update")
            .Argument<UpdateUserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                
                var user = ctx.GetArgument<User>("user");

                var updated = await uow.GenericRepository<User>().UpdateAsync(user);
                await uow.SaveAsync();
                return updated;
            });

        Field<bool>("deleteById")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("id");
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id);
                
                if (user == null) { return false;}
                
                var isDeleted = await uow.GenericRepository<User>()
                    .DeleteAsync(user);
                
                await uow.SaveAsync();

                return isDeleted;
            });

        Field<bool>("delete")
            .Argument<UpdateUserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var user = ctx.GetArgument<User>("user");
                var isDeleted = await uow.GenericRepository<User>().DeleteAsync(user);
                await uow.SaveAsync();
                return isDeleted;
            });

        Field<string>("verifyUser")
        .Argument<string>("token")
        .Argument<string>("password")
        .ResolveAsync(async ctx =>
        {
            var token = ctx.GetArgument<string>("token");
            var authEmailService = ctx.RequestServices?.GetRequiredService<EmailTokenService>();
                
            var valid = await authEmailService!.VerifyUserToken(token, 18000);
            if(valid)
            {
                var id = authEmailService.GetUserIdFromToken(token);
                
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id);
                if(user is not null)
                {
                    var password = ctx.GetArgument<string>("password");
                    user.Password = BCrypt.Net.BCrypt.HashPassword(password);
                    var updated = await uow.GenericRepository<User>().UpdateAsync(user);
                    
                    await uow.SaveAsync();
                    await emailService.SendEmailConfirmationAsync(updated);

                    return "Check your email!";
                }
            }
            return "Failed to verify account!";
        });
        
    }
}