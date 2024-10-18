using Microsoft.AspNetCore.Identity;

namespace backend.Interfaces;
public interface IIdentityService

{
    Task<string> LoginAsync(string username, string password);
    Task LogoutAsync();
    string GenerateJwtToken(IdentityUser user);
}