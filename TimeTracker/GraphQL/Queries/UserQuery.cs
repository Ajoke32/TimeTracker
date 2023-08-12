﻿using System.ComponentModel.DataAnnotations;
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
using TimeTracker.Utils.Errors;
using TimeTracker.Utils.Filters;


namespace TimeTracker.GraphQL.Queries;


public sealed class UserQuery : ObjectGraphType
{

    private readonly IUnitOfWorkRepository _uow;
    public UserQuery(IUnitOfWorkRepository uow,IMapper mapper)
    {
        _uow = uow;

        Field<ListGraphType<UserType>>("users")
            .Argument<string>("include", nullable: true, configure: c => c.DefaultValue = "")
            .ResolveAsync(async ctx =>
            {
                var include = ctx.GetArgument<string>("include");
                
                
                var users = await uow.GenericRepository<User>()
                    .GetAsync(includeProperties: include);
                
                return users.ApplyGraphQlFilters(ctx)
                    .ApplyGraphQlOrdering(ctx)
                    .ApplyGraphQlPaging(ctx);
            })
            .Description("gets all users")
            .UseFiltering()
            .UsePaging()
            .UseOrdering();

        Field<UserType>("user")
            .Argument<int>("id")
            .Argument<string>("include",nullable:true)
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("id");

                var include = _.GetArgument<string?>("include");
                
                var user = await uow.GenericRepository<User>().FindAsync(u=>u.Id==id,relatedData:include)
                            ?? throw new QueryError(Error.ERR_USER_NOT_FOUND);

                return user;
            }).Description("gets user by id");

        Field<UserType>("userByEmail")
            .Argument<string>("email")
            .ResolveAsync(async _ =>
            {
                var email = _.GetArgument<string>("email");
               
                var user = await uow.GenericRepository<User>().FindAsync(u => u.Email == email)
                            ?? throw new QueryError(Error.ERR_USER_NOT_FOUND);

                return user;
            });//.AuthorizeWithPolicy(policy:"LoggedIn");

        Field<string>("login")
            .Argument<UserLoginInputType>("user")
            .ResolveAsync(async ctx =>
            {
                var args = ctx.GetArgument<User>("user");

                var searchUser = await uow.GenericRepository<User>()
                    .FindAsync(u => u.Email == args.Email);
                
                if (searchUser == null||searchUser.IsDeleted)
                {
                    throw new QueryError(Error.ERR_WRONG_CREDENTIALS);
                }
                                
                if (!searchUser.IsEmailActivated) throw new QueryError(Error.ERR_INACTIVE_ACCOUNT);
                                
                var authService = ctx.RequestServices?.GetRequiredService<Authenticate>();
                    
                return await AuthorizeConfirmedEmailAsync(searchUser, args.Password, authService!);
            });

        Field<bool>("verifyUser")
            .Argument<string>("token")
            .ResolveAsync(async _ =>
            {
                var token = _.GetArgument<string>("token");
                var authEmailService = _.RequestServices?.GetRequiredService<EmailTokenService>();
                
                var result = await authEmailService!.VerifyUserToken(token, 18000); //5 hours

                return result ? result : throw new QueryError(Error.ERR_INVALID_TOKEN);
            });

        Field<string>("refreshToken")
            .Argument<int>("userId")
            .ResolveAsync(async _ =>
            {
                var id = _.GetArgument<int>("userId");
                var user = await _uow.GenericRepository<User>().FindAsync(u => u.Id == id)
                            ?? throw new QueryError(Error.ERR_USER_NOT_FOUND);

                var authService = _.RequestServices?.GetRequiredService<Authenticate>();
                
                return authService!.RefreshToken(user);
            });
        
        Field<ListGraphType<UserType>>("usersByIds")
            .Argument<List<int>>("ids")
            .ResolveAsync(async _ =>
            {
                var ids = _.GetArgument<List<int>>("ids");
                
                
                return await uow.GenericRepository<User>()
                    .GetAsync(u => ids.Contains(u.Id));
            });

       

    }

    private async Task<string> AuthorizeConfirmedEmailAsync(User actualUser,string password,Authenticate authenticate)
    {
        if (!BCrypt.Net.BCrypt.Verify(password, actualUser.Password))
        {
            throw new QueryError(Error.ERR_WRONG_CREDENTIALS);
        }
        
        var token = authenticate.GenerateToken(actualUser);
        var refToken = authenticate.GenerateRefreshToken();
        actualUser.RefreshToken = refToken.Token;
        actualUser.RefreshTokenExpiration = refToken.Expiration;
        await _uow.SaveAsync();
        
        return token;
    }

   

}

