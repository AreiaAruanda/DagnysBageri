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

    // Existing endpoint to get all products
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

    // New endpoint to get a product by ID
    [HttpGet]
    [Route("{id:int}")]  // Route parameter for product ID
    public async Task<IActionResult> GetProductById(int id)
    {
        _logger.LogInformation($"products/{id} called");

        try
        {
            _logger.LogInformation($"Getting the product with ID {id}");
            var product = await _productService.GetProductByIdAsync(id);  // Fetch the product by ID

            if (product == null)
            {
                _logger.LogWarning($"Product with ID {id} not found");
                return NotFound($"Product with ID {id} not found");  // Return 404 if the product is not found
            }

            _logger.LogInformation($"Returning the product with ID {id}");
            return Ok(product);  // Return the product data
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"An error occurred while getting the product with ID {id}");
            return StatusCode(500, "An error occurred while getting the product");
        }
    }
}
