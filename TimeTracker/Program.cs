using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSpaStaticFiles(conf =>
{
    conf.RootPath = "ClientApp/build";
});
var app = builder.Build();


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

});


app.Run();