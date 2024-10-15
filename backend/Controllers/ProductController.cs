using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[ApiController]
[Route("api/v1/products")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;

    public ProductController(ILogger<ProductController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [Route("List")]
    public IActionResult List()
    {
        _logger.LogInformation("products/list called");
        return Ok("List of products");
    }
}