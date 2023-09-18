using Microsoft.AspNetCore.Mvc;

namespace TimeTracker.Controllers;

public class AuthController:Controller
{

    private readonly IConfiguration _configuration;
    
    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
    [HttpGet("to-google-auth")]
    public IActionResult RedirectToGoogleAuth()
    {
        var clientId = _configuration["Authentication:Google:ClientId"]!;
        var url = "https://timetrackerproject.azurewebsites.net/google-auth";

        var redirectUrl = $"https://accounts.google.com/o/oauth2/v2/auth?response_type=id_token&redirect_uri={url}&client_id={clientId}&nonce=sdkoqkwew&scope=email";

        return Redirect(redirectUrl);
    }
}