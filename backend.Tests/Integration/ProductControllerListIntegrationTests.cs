using Microsoft.AspNetCore.Mvc.Testing;
using backend.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System.Net.Http.Json;
using backend.Models;
using backend.Tests.Services;
using System.Text.Json;


namespace backend.Tests.Integration;

public class ProductControllerListIntegrationTests : IClassFixture<CustomWebApplicationFactory<Program>>
{
    private readonly HttpClient _client;
    private readonly CustomWebApplicationFactory<Program> _factory;
    public ProductControllerListIntegrationTests(CustomWebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _client = factory.CreateClient();
    }


    [Fact]
    public async Task List_ReturnsOkResult()
    {
        // Arrange
        using (var scope = _factory.Services.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<WebshopDbContext>();
            await context.Database.EnsureDeletedAsync();
            await context.Database.EnsureCreatedAsync();

            // Seed the database with test data
            SeedData.SeedProductsAndCategories(scope.ServiceProvider);
        }
        // Act
        var response = await _client.GetAsync("/api/v1/products/List");

        // Assert
        var responseContent = await response.Content.ReadAsStringAsync();
        if (!response.IsSuccessStatusCode)
        {
            throw new HttpRequestException($"Response status code does not indicate success: {response.StatusCode} ({responseContent}).");
        }

        try
        {
            var products = await response.Content.ReadFromJsonAsync<List<ProductModel>>();
            Assert.NotNull(products);
            Assert.NotEmpty(products);
            Assert.Contains(products, p => p.Name == "Sourdough Bread");
        }
        catch (JsonException ex)
        {
            throw new JsonException($"Failed to deserialize response content: {responseContent}", ex);
        }

    }
}