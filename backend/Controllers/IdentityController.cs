using Microsoft.AspNetCore.Mvc;
using backend.ViewModels;
using Microsoft.AspNetCore.Authorization;
using backend.Interfaces;


namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class IdentityController : ControllerBase
    {
        private readonly ILogger<IdentityController> _logger;
        private readonly IIdentityService _identityService;

        public IdentityController(ILogger<IdentityController> logger, IIdentityService identityService)
        {
            _logger = logger;
            _identityService = identityService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try 
            {
                var token = await _identityService.LoginAsync(model.Username, model.Password);
                if (token != null)
                {
                    return Ok(new { token });
                }
                return Unauthorized(new { message = "Invalid username or password" });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error logging in");
                return StatusCode(500, new { message = "An error occurred while logging in" });
            }
        }
        
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _identityService.LogoutAsync();
                return Ok(new { message = "Logged out" });
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error logging out");
                return StatusCode(500, new { message = "An error occurred while logging out" });
            }
        }
        
    }
}