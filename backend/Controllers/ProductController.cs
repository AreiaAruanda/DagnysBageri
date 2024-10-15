using Microsoft.AspNetCore.Mvc;
using backend.Interfaces;
using backend.ViewModels;

namespace backend.Controllers;
[ApiController]
[Route("api/v1/products")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;

    public ProductController(ILogger<ProductController> logger, IProductService productService)
    {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet]
    [Route("List")]
    public async Task<IActionResult> List()
    {
        _logger.LogInformation("products/list called");

        try
        {
            _logger.LogInformation("Getting the list of products");
            List<ProductViewModel> products = await _productService.GetProductsAsync();
            _logger.LogInformation("Returning the list of products");
            return await Task.FromResult(Ok(products));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting the list of products");
            return await Task.FromResult(StatusCode(500, "An error occurred while getting the list of products"));
        }
    }
}