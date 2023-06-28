using GraphQL;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using TimeTracker.Absctration;
using TimeTracker.AppContext;
using TimeTracker.GraphQL;
using TimeTracker.GraphQL.Schemes;
using TimeTracker.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaStaticFiles(conf =>
{
    conf.RootPath = "ClientApp/build";
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




var app = builder.Build();

/*
app.UseSpaStaticFiles();

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

});*/

app.UseGraphQL();
app.UseGraphQLAltair();


app.Run();