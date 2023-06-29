using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TimeTracker.Models;

namespace TimeTracker.Utils.Auth;

public class Authenticate
{
    private readonly IConfiguration _config;
    
    public Authenticate(IConfiguration config)
    {
        _config = config;
    }
    
    public string GenerateToken(User user)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name,user.FirstName),
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.Surname,user.LastName),
            new Claim("Id",user.Id.ToString()),
            new Claim("Permissions",user.Permissions.ToString()),
            new Claim("WorkType",user.WorkType.ToString()),
            new Claim("VacationDays",user.VacationDays.ToString())
        };
        
        var key = Encoding.UTF8.GetBytes(_config["Jwt:Key"]!);
    
            
        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddMinutes(5),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha512Signature)
            
        };

        var tokenHandler = new JwtSecurityTokenHandler();

        var token = tokenHandler.CreateToken(tokenDescriptor);
        
        return tokenHandler.WriteToken(token);
    }
    
}