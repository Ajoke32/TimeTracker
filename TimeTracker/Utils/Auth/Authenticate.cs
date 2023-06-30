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
            new ("Name",user.FirstName),
            new (ClaimTypes.Email,user.Email),
            new ("LastName",user.LastName),
            new ("Id",user.Id.ToString()),
            new ("Permissions",Convert.ToInt32(user.Permissions).ToString()),
            new ("WorkType",user.WorkType.ToString()),
            new ("VacationDays",user.VacationDays.ToString())
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