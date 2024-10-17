using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using backend.ViewModels;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.Text;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class IdentityController : ControllerBase
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;

        public IdentityController(IConfiguration configuration, ILogger<IdentityController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var token = GenerateJwtToken(user);
                return await Task.FromResult(Ok(new { token }));
            }

            return await Task.FromResult(Unauthorized());
        }

        private string GenerateJwtToken(IdentityUser user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        [HttpDelete("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return await Task.FromResult(Ok("Logged out"));
        }
        
    }
}