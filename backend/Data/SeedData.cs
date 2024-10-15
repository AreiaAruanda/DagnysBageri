using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Data
{
    public static class SeedData
    {
        // Method to seed initial products and categories into the database
        public static void SeedProductsAndCategories(IServiceProvider serviceProvider)
        {
            using (var context = new WebshopDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<WebshopDbContext>>()))
            {
                // Check if the database has already been seeded
                if (context.Products.Any() || context.Categories.Any())
                {
                    return;   // DB has been seeded
                }

                // Create a list of categories
                var categories = new List<CategoryModel>
                {
                    new CategoryModel { Name ="Bakery", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Bread", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Pastry", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Desserts", Products = new List<ProductModel>() }
                };

                // Add categories to the context
                context.Categories.AddRange(categories);
                context.SaveChanges();

                // Create product instances
                var sourdoughBread = new ProductModel
                {
                    Name = "Sourdough Bread",
                    Description = "A loaf of freshly baked sourdough bread.",
                    Price = 4.99M,
                    Ingredients = new List<string> { "Flour", "Water", "Salt", "Yeast" },
                    FilterTags = new List<string> { "Bread", "Sourdough", "Vegan" },
                    Categories = new List<CategoryModel> { categories[0], categories[1] },
                    ImagePath = "./Data/Images/Products/sourdough-bread.webp"
                };

                var chocolateCroissant = new ProductModel
                {
                    Name = "Chocolate Croissant",
                    Description = "A flaky croissant filled with rich chocolate.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Flour", "Butter", "Chocolate", "Sugar", "Yeast" },
                    FilterTags = new List<string> { "Pastry", "Chocolate", "Breakfast" },
                    Categories = new List<CategoryModel> { categories[0], categories[2] },
                    ImagePath = "./Data/Images/Products/chocolate-croissant.webp"
                };

                var bagel = new ProductModel
                {
                    Name = "Bagel",
                    Description = "A classic bagel, perfect for breakfast.",
                    Price = 1.49M,
                    Ingredients = new List<string> { "Flour", "Water", "Salt", "Yeast", "Sugar" },
                    FilterTags = new List<string> { "Bread", "Bagel", "Breakfast" },
                    Categories = new List<CategoryModel> { categories[0], categories[1] },
                    ImagePath = "./Data/Images/Products/bagel.webp"
                };

                var veganBrownie = new ProductModel
                {
                    Name = "Vegan Brownie",
                    Description = "A rich and fudgy brownie made without any animal products.",
                    Price = 3.49M,
                    Ingredients = new List<string> { "Flour", "Cocoa Powder", "Sugar", "Vegetable Oil", "Water" },
                    FilterTags = new List<string> { "Dessert", "Vegan", "Chocolate" },
                    Categories = new List<CategoryModel> { categories[0], categories[3] },
                    ImagePath = "./Data/Images/Products/vegan-brownie.webp"
                };

                var glutenFreeMuffin = new ProductModel
                {
                    Name = "Gluten-Free Muffin",
                    Description = "A delicious muffin made with gluten-free ingredients.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Gluten-Free Flour", "Sugar", "Eggs", "Butter", "Milk" },
                    FilterTags = new List<string> { "Dessert", "Gluten-Free", "Muffin" },
                    Categories = new List<CategoryModel> { categories[0], categories[3] },
                    ImagePath = "./Data/Images/Products/gluten-free-muffin.webp"
                };

                // Add products to the context
                context.Products.AddRange(sourdoughBread, chocolateCroissant, bagel, veganBrownie, glutenFreeMuffin);
                context.SaveChanges();

                // Update categories with products
                categories[0].Products.AddRange(new[] { sourdoughBread, chocolateCroissant, bagel, veganBrownie, glutenFreeMuffin });
                categories[1].Products.AddRange(new[] { sourdoughBread, bagel });
                categories[2].Products.Add(chocolateCroissant);
                categories[3].Products.AddRange(new[] { veganBrownie, glutenFreeMuffin });

                // Save changes to the context
                context.SaveChanges();
            }
        }

        // Method to seed initial users into the database
        public static async Task SeedUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

            // Check if the database has already been seeded with users
            if (await userManager.Users.AnyAsync())
            {
                return; // DB has been seeded
            }

            // Create a new user instance
            var user = new IdentityUser 
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = true
            };

            // Create the user with a specified password
            var result = await userManager.CreateAsync(user, "Admin@123");

            // Throw an exception if user creation failed
            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }

        // Method to clear the database
        public static async Task ClearDatabaseAsync(IServiceProvider serviceProvider)
        {
            using (var context = new WebshopDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<WebshopDbContext>>()))
            {
                // Disable foreign key constraints
                await context.Database.ExecuteSqlRawAsync("PRAGMA foreign_keys=OFF");

                // Get all table names in the database
                var tableNames = context.Model.GetEntityTypes()
                    .Select(t => t.GetTableName())
                    .Distinct()
                    .ToList();

                // Delete all records from each table
                foreach (var tableName in tableNames)
                {
                    string deleteCommand = $"DELETE FROM [{tableName}]";
                    await context.Database.ExecuteSqlRawAsync(deleteCommand);
                }

                // Reset the auto-increment counters
                await context.Database.ExecuteSqlRawAsync("DELETE FROM sqlite_sequence");

                // Re-enable foreign key constraints
                await context.Database.ExecuteSqlRawAsync("PRAGMA foreign_keys=ON");
            }
        }
    }
}