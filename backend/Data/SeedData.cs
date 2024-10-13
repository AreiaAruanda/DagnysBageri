using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using backend.Models;

namespace backend.Data
{
    public static class SeedData
    {
        public static void SeedProductsAndCategories(IServiceProvider serviceProvider)
        {
            using (var context = new WebshopDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<WebshopDbContext>>()))
            {
                // Look for any products.
                if (context.Products.Any() || context.Categories.Any())
                {
                    return;   // DB has been seeded
                }

                var categories = new List<CategoryModel>
                {
                    new CategoryModel { Name ="Bakery", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Bread", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Pastry", Products = new List<ProductModel>() },
                    new CategoryModel { Name ="Desserts", Products = new List<ProductModel>() }
                };

                context.Categories.AddRange(categories);
                context.SaveChanges();

                var sourdoughBread = new ProductModel
                {
                    Name = "Sourdough Bread",
                    Description = "A loaf of freshly baked sourdough bread.",
                    Price = 4.99M,
                    Ingredients = new List<string> { "Flour", "Water", "Salt", "Yeast" },
                    FilterTags = new List<string> { "Bread", "Sourdough", "Vegan" },
                    Categories = new List<CategoryModel> { categories[0], categories[1] }
                };

                var chocolateCroissant = new ProductModel
                {
                    Name = "Chocolate Croissant",
                    Description = "A flaky croissant filled with rich chocolate.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Flour", "Butter", "Chocolate", "Sugar", "Yeast" },
                    FilterTags = new List<string> { "Pastry", "Chocolate", "Breakfast" },
                    Categories = new List<CategoryModel> { categories[0], categories[2] }
                };

                var bagel = new ProductModel
                {
                    Name = "Bagel",
                    Description = "A classic bagel, perfect for breakfast.",
                    Price = 1.49M,
                    Ingredients = new List<string> { "Flour", "Water", "Salt", "Yeast", "Sugar" },
                    FilterTags = new List<string> { "Bread", "Bagel", "Breakfast" },
                    Categories = new List<CategoryModel> { categories[0], categories[1] }
                };

                var veganBrownie = new ProductModel
                {
                    Name = "Vegan Brownie",
                    Description = "A rich and fudgy brownie made without any animal products.",
                    Price = 3.49M,
                    Ingredients = new List<string> { "Flour", "Cocoa Powder", "Sugar", "Vegetable Oil", "Water" },
                    FilterTags = new List<string> { "Dessert", "Vegan", "Chocolate" },
                    Categories = new List<CategoryModel> { categories[0], categories[3] }
                };

                var glutenFreeMuffin = new ProductModel
                {
                    Name = "Gluten-Free Muffin",
                    Description = "A delicious muffin made with gluten-free ingredients.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Gluten-Free Flour", "Sugar", "Eggs", "Butter", "Milk" },
                    FilterTags = new List<string> { "Dessert", "Gluten-Free", "Muffin" },
                    Categories = new List<CategoryModel> { categories[0], categories[3] }
                };

                context.Products.AddRange(sourdoughBread, chocolateCroissant, bagel, veganBrownie, glutenFreeMuffin);
                context.SaveChanges();

                // Update categories with products
                categories[0].Products.AddRange(new[] { sourdoughBread, chocolateCroissant, bagel, veganBrownie, glutenFreeMuffin });
                categories[1].Products.AddRange(new[] { sourdoughBread, bagel });
                categories[2].Products.Add(chocolateCroissant);
                categories[3].Products.AddRange(new[] { veganBrownie, glutenFreeMuffin });

                context.SaveChanges();
            }
        }

        public static async Task SeedUsers(IServiceProvider serviceProvider)
        {
            var userManager = serviceProvider.GetRequiredService<UserManager<IdentityUser>>();

            if (await userManager.Users.AnyAsync())
            {
                return; // DB has been seeded
            }

            var user = new IdentityUser 
            {
                UserName = "admin@example.com",
                Email = "admin@example.com",
                EmailConfirmed = true
            };

            var result = await userManager.CreateAsync(user, "Admin@123");

            if (!result.Succeeded)
            {
                throw new InvalidOperationException("Failed to create user: " + string.Join(", ", result.Errors.Select(e => e.Description)));
            }
        }
    }
}