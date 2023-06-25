var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();


app.Map("/", async (c) =>
{
   await c.Response.WriteAsync("Hello");
});

app.Run();