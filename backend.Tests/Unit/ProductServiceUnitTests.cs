using System.Reflection;
using backend.ViewModels;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using backend.Tests.Services;
using Microsoft.Extensions.Logging;
using Moq;

namespace backend.Tests.Unit
{
    public class ProductServiceUnitTests
    {
        private readonly Mock<ILogger<ProductService>> _loggerMock;
        private readonly Mock<IImageService> _imageServiceMock;

        public ProductServiceUnitTests()
        {
            _loggerMock = new Mock<ILogger<ProductService>>();
            _imageServiceMock = new Mock<IImageService>();
        }

        [Fact]
        public void CreateProductViewModel_ShouldReturnProductViewModel()
        {
            using (var context = TestDbContextHelper.CreateInMemoryDbContext())
            {
                // Arrange
                var product = new ProductModel
                {
                    Id = 1,
                    Name = "Product 1",
                    Description = "description1",
                    Price = 1.99M,
                    FilterTags = new List<string> { "tag1", "tag2" },
                    Ingredients = new List<string> { "ingredient1", "ingredient2" },
                    Categories = new List<CategoryModel> { new CategoryModel { Id = 1, Name = "Category 1", Products = new List<ProductModel>() } },
                    ImagePath = "path1"
                };

                _imageServiceMock.Setup(i => i.GetThumbnailPath(It.IsAny<string>())).Returns("thumbnailPath");
                _imageServiceMock.Setup(i => i.GetBase64String(It.IsAny<string>())).Returns("base64String");

                var productService = new ProductService(_loggerMock.Object, context, _imageServiceMock.Object);

                // Use reflection to access the private method CreateProductViewModel
                MethodInfo methodInfo = typeof(ProductService).GetMethod("CreateProductViewModel", BindingFlags.NonPublic | BindingFlags.Instance)!;
                Assert.NotNull(methodInfo);

                // Act
                var result = (ProductViewModel)methodInfo.Invoke(productService, new object[] { product })!;

                // Assert
                Assert.NotNull(result);
                Assert.IsType<ProductViewModel>(result);
                Assert.Equal(product.Id, result.Id);
                Assert.Equal(product.Name, result.Name);
                Assert.Equal(product.Description, result.Description);
                Assert.Equal(product.Price, result.Price);
                Assert.Equal(product.FilterTags, result.FilterTags);
                Assert.Equal(product.Ingredients, result.Ingredients);
                Assert.Equal("base64String", result.Thumbnail);
                Assert.Equal(product.Categories.Select(c => c.Name).ToList(), result.Categories);
            }
        }

        [Fact]
        public async Task GetProductsAsync_ShouldReturnListOfProductViewModels()
        {
            using (var context = TestDbContextHelper.CreateInMemoryDbContext())
            {
                // Arrange
                _imageServiceMock.Setup(i => i.GetThumbnailPath(It.IsAny<string>())).Returns("thumbnailPath");
                _imageServiceMock.Setup(i => i.GetBase64String(It.IsAny<string>())).Returns("base64String");

                var productService = new ProductService(_loggerMock.Object, context, _imageServiceMock.Object);

                // Act
                var result = await productService.GetProductsAsync();

                // Assert
                Assert.NotNull(result);
                Assert.IsType<List<ProductViewModel>>(result);
                Assert.Equal(2, result.Count);
                Assert.All(result, p => Assert.Equal("base64String", p.Thumbnail));
            }
        }
    }
}