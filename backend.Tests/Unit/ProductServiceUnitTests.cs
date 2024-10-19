using System.Reflection;
using backend.ViewModels;
using backend.Interfaces;
using backend.Models;
using backend.Services;
using backend.Tests.Services;
using Microsoft.Extensions.Logging;
using Moq;
using Microsoft.Extensions.DependencyInjection;

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
                _imageServiceMock.Setup(i => i.GetThumbnailPath(It.IsAny<string>())).Returns("thumbnailPath");
                _imageServiceMock.Setup(i => i.GetBase64String(It.IsAny<string>())).Returns("base64String");

                var productService = new ProductService(_loggerMock.Object, context, _imageServiceMock.Object);

                // Use reflection to access the private method CreateProductViewModel
                MethodInfo methodInfo = typeof(ProductService).GetMethod("CreateProductViewModel", BindingFlags.NonPublic | BindingFlags.Instance)!;
                Assert.NotNull(methodInfo);

                var product = context.Products.First();

                // Convert List<CategoryModel> to List<CategoryViewModel>
                var categoryViewModels = product.Categories.Select(c => new CategoryViewModel { Id = c.Id, Name = c.Name, CategoryURL = c.CategoryURL }).ToList();
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

                Assert.Collection(result.Categories,
                    categoryViewModels.Select(expected => (Action<CategoryViewModel>)(actual =>
                    {
                        Assert.Equal(expected.Id, actual.Id);
                        Assert.Equal(expected.Name, actual.Name);
                        Assert.Equal(expected.CategoryURL, actual.CategoryURL);
                    })).ToArray());
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