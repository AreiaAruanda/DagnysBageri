using backend.Controllers;
using backend.Interfaces;
using backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;

namespace backend.Tests.Unit
{
    public class ProductControllerListUnitTests
    {
        private readonly Mock<ILogger<ProductController>> mockLogger;
        private readonly Mock<IProductService> mockProductService;
        private readonly string fakeBase64WebPImage = "fakeBase64WebPImage";

        public ProductControllerListUnitTests()
        {
            mockLogger = new Mock<ILogger<ProductController>>();
            mockProductService = new Mock<IProductService>();
        }

        [Fact]
        public async Task List_ReturnsOkResult_WithListOfProducts()
        {
            // Arrange
            var products = new List<ProductViewModel>
            {
                new ProductViewModel
                {
                    Id = 1,
                    Name = "Product Name",
                    Description = "Product Description",
                    Price = 19.99M,
                    FilterTags = new List<string> { "tag1", "tag2" },
                    Ingredients = new List<string> { "ingredient1", "ingredient2" },
                    Categories = new List<string> { "category1", "category2" },
                    Thumbnail = fakeBase64WebPImage,
                }
            };

            mockProductService.Setup(service => service.GetProductsAsync())
                .ReturnsAsync(products);

            var controller = new ProductController(mockLogger.Object, mockProductService.Object);

            // Act
            var result = await controller.List();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<List<ProductViewModel>>(okResult.Value);
        }

        [Fact]
        public async Task List_ReturnsInternalServerError_WhenExceptionIsThrown()
        {
            // Arrange
            mockProductService.Setup(service => service.GetProductsAsync())
                .ThrowsAsync(new Exception("An error occurred while getting the list of products"));

           var controller = new ProductController(mockLogger.Object, mockProductService.Object);

           // Act
           var result = await controller.List();

           // Assert
           var objectResult = Assert.IsType<ObjectResult>(result);
           Assert.Equal(500, objectResult.StatusCode); 
        }
    }
}