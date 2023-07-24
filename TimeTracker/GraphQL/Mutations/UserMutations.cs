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
using TimeTracker.Utils.Errors;
using TimeTracker.Enums;

namespace TimeTracker.GraphQL.Mutations;

public sealed class UserMutations:ObjectGraphType
{
   
    public UserMutations(IMapper mapper,EmailService emailService,IUnitOfWorkRepository uow)
    {

        Field<UserType>("create")
            .Argument<UserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var user = ctx.GetArgument<UserInputDto>("user");
                if (!EmailValidation.IsValidEmail(user.Email))
                {
                    throw new ValidationError("Invalid email format");
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
                return created;
            });//.AuthorizeWithPolicy("Create");

        
        Field<bool>("update")
            .Argument<UpdateUserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var editedUser = ctx.GetArgument<UserUpdateDto>("user");

                var user = await uow.GenericRepository<User>().FindAsync(u => u.Id == editedUser.Id)
                            ?? throw new ValidationError("User not found!");                

                var updated = await uow.GenericRepository<User>()
                                       .UpdateAsync(mapper.Map<UserUpdateDto, User>(editedUser, user));
                await uow.SaveAsync();
                return true;
            });

        Field<int>("deleteById")
            .Argument<int>("id")
            .ResolveAsync(async ctx =>
            {
                var id = ctx.GetArgument<int>("id");
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id)
                            ?? throw new QueryError(Error.ERR_USER_NOT_FOUND);
                
                if(!await uow.GenericRepository<User>().DeleteAsync(user))
                    throw new QueryError(Error.ERR_FAILED_TO_DELETE_USER);
                
                await uow.SaveAsync();

                return id;
            });

        Field<bool>("delete")
            .Argument<UpdateUserInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var user = ctx.GetArgument<User>("user");
                if(!await uow.GenericRepository<User>().DeleteAsync(user))
                    throw new QueryError(Error.ERR_FAILED_TO_DELETE_USER);

                await uow.SaveAsync();
                return true;
            });

        Field<bool>("verifyUser")
        .Argument<string>("token")
        .Argument<string>("password")
        .ResolveAsync(async ctx =>
        {
            var token = ctx.GetArgument<string>("token");
            var authEmailService = ctx.RequestServices?.GetRequiredService<EmailTokenService>();
                
            var valid = await authEmailService!.VerifyUserToken(token, 72000); // 20 hours
            if(valid)
            {
                var id = authEmailService.GetUserIdFromToken(token);
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id);

                if(user is not null && !user.IsEmailActivated)
                {
                    var password = ctx.GetArgument<string>("password");
                    user.Password = BCrypt.Net.BCrypt.HashPassword(password);
                    var updated = await uow.GenericRepository<User>().UpdateAsync(user);
                    
                    await uow.SaveAsync();
                    return true;
                }
            }
            throw new QueryError(Error.ERR_INVALID_TOKEN);
        });
        
    }
}