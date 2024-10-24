using backend.Models;
using backend.ViewModels;
using backend.Interfaces;
using Microsoft.EntityFrameworkCore;
using backend.Data;

namespace backend.Services;

public class ProductService : IProductService
{
    private readonly ILogger<ProductService> _logger;
    private readonly WebshopDbContext _context;
    private readonly IImageService _imageService;
    public ProductService(ILogger<ProductService> logger, WebshopDbContext context, IImageService imageService)
    {
        _logger = logger;
        _context = context;
        _imageService = imageService;
    }

    public async Task<List<ProductViewModel>> GetProductsAsync()
    {
        try
        {
            var products = await _context.Products.Include(p => p.Categories).ToListAsync();
            return products.Select(CreateProductViewModel).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting the list of products");
            throw new Exception("Failed to get products", ex);
        }
    }

    private ProductViewModel CreateProductViewModel(ProductModel product)
    {
        try
        {
            string thumbnailPath = _imageService.GetThumbnailPath(product.ImagePath);
            string base64String = _imageService.GetBase64String(thumbnailPath);

            return new ProductViewModel
            {
                Id = product.Id,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                FilterTags = product.FilterTags,
                Ingredients = product.Ingredients,
                Categories = product.Categories.Select(c 
                    => new CategoryViewModel
                    {
                        Id = c.Id,
                        Name = c.Name,
                        CategoryURL = c.CategoryURL
                    }).ToList(),
                Thumbnail = base64String
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to create product view model for product ID {ProductId}", product.Id);
            throw new Exception("Failed to create product view model", ex);
        }
    }
}