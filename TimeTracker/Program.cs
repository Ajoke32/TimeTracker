using System.Text;
using AutoMapper;
using GraphQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Quartz;
using TimeTracker.Absctration;
using TimeTracker.AppContext;
using TimeTracker.Enums;
using TimeTracker.GraphQL;
using TimeTracker.GraphQL.Schemes;
using TimeTracker.MapperProfiles;
using TimeTracker.Repositories;
using TimeTracker.Utils.Auth;
using TimeTracker.Utils.BackgroundTasks;
using TimeTracker.Utils.Email;
using TimeTracker.Utils.Environment;
using TimeTracker.Utils.Filters;
using TimeTracker.Utils.SoftDelete;
using TimeTracker.Visitors;
using Vite.AspNetCore;
using Vite.AspNetCore.Extensions;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaStaticFiles(conf => { conf.RootPath = "ClientApp/build"; });


builder.Services.AddAuthentication(conf =>
{
    conf.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    conf.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    conf.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!)),
        ValidateIssuerSigningKey = true,
        RequireExpirationTime = true,
        RequireSignedTokens = false
    };
});

builder.Services.AddSingleton<IAuthorizationHandler, PermissionHandler>();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("LoggedIn", (a) => { a.RequireAuthenticatedUser(); });

    options.AddPolicy("Read", p => { p.Requirements.Add(new PermissionRequirement(Permissions.Read)); });


    options.AddPolicy("AllRights", p =>
    {
        p.Requirements.Add(new PermissionRequirement(Permissions.Create | Permissions.Read
                                                                        | Permissions.Delete | Permissions.Update));
    });

    options.AddPolicy("Create", p => { p.Requirements.Add(new PermissionRequirement(Permissions.Create)); });

    options.AddPolicy("Delete", p => { p.Requirements.Add(new PermissionRequirement(Permissions.Delete)); });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "MyAllowSpecificOrigins",
        policy =>
        {
            policy.AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});


builder.Services.AddDataProtection();

/*builder.Services.AddQuartz(q =>
{
    q.UseMicrosoftDependencyInjectionJobFactory();
    var accuralOfHoursJobKey = new JobKey("auto");
    q.AddJob<AccuralOfHours>(o=>o.WithIdentity(accuralOfHoursJobKey));
    q.AddTrigger(o =>
    {
        o.ForJob(accuralOfHoursJobKey)
            .WithIdentity("auth-trigger")
            .WithCronSchedule("0 0 0 ? * MON,FRI *");
    });
    
});

builder.Services.AddQuartzHostedService(q => q.WaitForJobsToComplete = true);*/


if (builder.Environment.IsDevelopment() && !builder.Environment.IsGraphQl())
{
    builder.Services.AddViteServices(options: new ViteOptions()
    {
        Server = new ViteServerOptions()
        {
            AutoRun = true,
            Port = 5173,
            ScriptName = "dev",
            TimeOut = 5
        },
        PackageDirectory = "ClientApp",
    });
}


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddScoped<IRepositoryFactory, RepositoryFactory>();

builder.Services.AddScoped<EmailService>();
builder.Services.AddScoped<EmailTokenService>();
builder.Services.AddScoped<IGraphQlArgumentVisitor, GraphQlArgumentsVisitor>();

builder.Services.AddScoped<IUnitOfWorkRepository, UnitOfWorkRepository>();

builder.Services.AddDbContext<TimeTrackerContext>((serv, options) =>
{
    var config = serv.GetRequiredService<IConfiguration>();
    options.UseSqlServer(config.GetConnectionString("TimeTracker"));
    options.AddInterceptors(new SoftDeleteInterceptor());
});

builder.Services.AddScoped<RootQuery>();
builder.Services.AddScoped<RootMutation>();

builder.Services.AddGraphQL(options =>
{
    options.AddSchema<AppSchema>(GraphQL.DI.ServiceLifetime.Scoped)
        .AddGraphTypes()
        .AddSystemTextJson()
        .AddAuthorizationRule()
        .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true)
        .AddAutoClrMappings();
});

builder.Services.AddTransient<Authenticate>();


var app = builder.Build();

app.UseCors("MyAllowSpecificOrigins");


app.UseAuthentication();
app.UseAuthorization();

app.UseSpaStaticFiles();


app.UseGraphQL();

app.UseGraphQLAltair();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";
    spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions()
    {
        OnPrepareResponse = ctx =>
        {
            var headers = ctx.Context.Response.GetTypedHeaders();
            headers.CacheControl = new CacheControlHeaderValue()
            {
                NoCache = true,
                NoStore = true,
                MustRevalidate = true
            };
        }
    };

    if (app.Environment.IsDevelopment())
    {
        app.UseViteDevMiddleware();
    }
});


app.Run();