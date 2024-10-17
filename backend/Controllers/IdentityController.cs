using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class IdentityController : ControllerBase
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public IdentityController(ILogger<IdentityController> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login()
        {
            return await Task.FromResult(Ok());
        }
        
        [HttpDelete("logout")]
        public async Task<IActionResult> Logout()
        {
            return await Task.FromResult(Ok());
        }
        
    }
}