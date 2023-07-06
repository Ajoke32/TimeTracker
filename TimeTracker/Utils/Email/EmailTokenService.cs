using GraphQL.Validation;
using Microsoft.AspNetCore.DataProtection;
using TimeTracker.Absctration;
using TimeTracker.Models;

namespace TimeTracker.Utils.Email;

public class EmailTokenService
{
    
    private readonly IDataProtectionProvider _protectionProvider;
    
    private readonly IUnitOfWorkRepository _repository;
    
    private readonly int _tokenExpiration = 300; // secs
    
    public EmailTokenService(IDataProtectionProvider dataProtectionProvider,IUnitOfWorkRepository repos)
    {
        _protectionProvider = dataProtectionProvider;
        _repository = repos;
    }
    
    public async Task<string> GenerateUserEmailTokenAsync(int userId)
    {
        try
        {
            var protector = _protectionProvider.CreateProtector("emailDataProtection");

            var user = await _repository.GenericRepository<User>().FindAsync(u => u.Id == userId);
            if (user == null)
            {
                throw new ArgumentException("incorrect id");
            }

            var ms = new MemoryStream();
            await using var writer = new BinaryWriter(ms);
            writer.Write(DateTimeOffset.UtcNow.ToUnixTimeSeconds());
            writer.Write(user.Id);
            writer.Write($"{user.FirstName}{user.LastName}");
            var protectedBytes = protector.Protect(ms.ToArray());

            return Convert.ToBase64String(protectedBytes);
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
       
    }

    public async Task<bool> VerifyUserToken(string token)
    {
        try
        {
            var protector = _protectionProvider.CreateProtector("emailDataProtection");
        
            var unprotected = protector.Unprotect(Convert.FromBase64String(token));

            await using var ms = new MemoryStream(unprotected);
        
            using var reader = new BinaryReader(ms);

            var createdAt = reader.ReadInt64();
        
            var expirationTime = createdAt + _tokenExpiration;
        
            if (expirationTime < DateTimeOffset.UtcNow.ToUnixTimeSeconds()){ return false; }

            var id = reader.ReadInt32();

            var user = await _repository.GenericRepository<User>()
                .FindAsync(u => u.Id == id);

            if (user == null) { return false;}
            
            var fullName = reader.ReadString();
            if (user.Id != id && $"{user.FirstName}{user.LastName}" != fullName)
            {
                return false;
            }

            user.IsEmailActivated = true;
            
            await _repository.SaveAsync();
            
            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
        
    }
}