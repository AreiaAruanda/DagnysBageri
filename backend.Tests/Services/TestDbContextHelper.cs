using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace backend.Tests.Services
{
    public static class TestDbContextHelper
    {
        public static WebshopDbContext CreateInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<WebshopDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new WebshopDbContext(options);
            SeedDatabase(context);
            return context;
        }

        private static void SeedDatabase(WebshopDbContext context)
        {
            var categories = new List<CategoryModel>
            {
                new CategoryModel { Id = 1, Name = "Category 1", Products = new List<ProductModel>(), CategoryURL = "category1" },
                new CategoryModel { Id = 2, Name = "Category 2", Products = new List<ProductModel>(), CategoryURL = "category2" }
            };

            var products = new List<ProductModel>
            {
                new ProductModel { 
                    Id = 1, 
                    Name = "Product 1", 
                    Description = "description1", 
                    FilterTags = new List<string> { "tag1", "tag2" }, 
                    Ingredients = new List<string> { "ingredient1", "ingredient2" }, 
                    ImagePath = "path1", 
                    Categories = new List<CategoryModel> { categories[0] } 
                },
                new ProductModel { 
                    Id = 2, 
                    Name = "Product 2", 
                    Description = "description2", 
                    FilterTags = new List<string> { "tag3", "tag4" }, 
                    Ingredients = new List<string> { "ingredient3", "ingredient4" }, 
                    ImagePath = "path2", 
                    Categories = new List<CategoryModel> { categories[1] } 
                }
            };

            context.Categories.AddRange(categories);
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
}