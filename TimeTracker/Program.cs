using System.Text;
using GraphQL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using TimeTracker.Absctration;
using TimeTracker.AppContext;
using TimeTracker.GraphQL;
using TimeTracker.GraphQL.Schemes;
using TimeTracker.Repositories;
using TimeTracker.Utils.Auth;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaStaticFiles(conf =>
{
    conf.RootPath = "ClientApp/build";
});

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
    };
});

builder.Services.AddScoped<IRepositoryFactory, RepositoryFactory>();

builder.Services.AddScoped<IUnitOfWorkRepository, UnitOfWorkRepository>();

builder.Services.AddDbContext<TimeTrackerContext>((serv,options) =>
{
    var config = serv.GetRequiredService<IConfiguration>();
    options.UseSqlServer(config.GetConnectionString("TimeTracker"));
});

builder.Services.AddScoped<RootQuery>();
builder.Services.AddScoped<RootMutation>();

builder.Services.AddGraphQL(options =>
{
    options.AddSchema<AppSchema>(serviceLifetime:GraphQL.DI.ServiceLifetime.Scoped).AddGraphTypes()
        .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true)
        .AddSystemTextJson();
});

builder.Services.AddTransient<Authenticate>();


var app = builder.Build();


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
        spa.UseReactDevelopmentServer(npmScript:"start");
    }

});




app.Run();