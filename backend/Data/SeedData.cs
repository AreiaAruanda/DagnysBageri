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
                    new CategoryModel { Name = "Classic Breads", Products = new List<ProductModel>() },         // Hearty loaves, farmhouse bread, sourdough, etc.
                    new CategoryModel { Name = "Grandma’s Pastries", Products = new List<ProductModel>() },     // Cinnamon buns, almond twists, Danish pastries
                    new CategoryModel { Name = "Homemade Cakes", Products = new List<ProductModel>() },         // Layer cakes, old-fashioned sponge cakes, cupcakes
                    new CategoryModel { Name = "Warm Drinks & Coffee", Products = new List<ProductModel>() },   // Homebrewed coffee, teas, and hot cocoa
                    new CategoryModel { Name = "Hearty Sandwiches", Products = new List<ProductModel>() }       // Homemade sandwiches with fresh bread and classic fillings
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
                    Categories = new List<CategoryModel> { categories[0] },  // Classic Breads
                    ImagePath = "./Data/Images/Products/sourdough-bread.webp"
                };

                var farmhouseBread = new ProductModel
                {
                    Name = "Farmhouse Bread",
                    Description = "A hearty loaf made with whole grains.",
                    Price = 5.49M,
                    Ingredients = new List<string> { "Whole Wheat Flour", "Water", "Yeast", "Salt" },
                    FilterTags = new List<string> { "Bread", "Whole Grain" },
                    Categories = new List<CategoryModel> { categories[0] },  // Classic Breads
                    ImagePath = "./Data/Images/Products/farmhouse-bread.webp"
                };

                // Grandma’s Pastries
                var cinnamonBun = new ProductModel
                {
                    Name = "Cinnamon Bun",
                    Description = "A sweet roll filled with cinnamon and sugar.",
                    Price = 2.49M,
                    Ingredients = new List<string> { "Flour", "Sugar", "Cinnamon", "Butter" },
                    FilterTags = new List<string> { "Pastry", "Cinnamon" },
                    Categories = new List<CategoryModel> { categories[1] },  // Grandma’s Pastries
                    ImagePath = "./Data/Images/Products/cinnamon-bun.webp"
                };

                var almondTwist = new ProductModel
                {
                    Name = "Almond Twist",
                    Description = "A flaky pastry twisted with almond filling.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Flour", "Almond Paste", "Butter", "Sugar" },
                    FilterTags = new List<string> { "Pastry", "Almond" },
                    Categories = new List<CategoryModel> { categories[1] },  // Grandma’s Pastries
                    ImagePath = "./Data/Images/Products/almond-twist.webp"
                };

                var chocolateCroissant = new ProductModel
                {
                    Name = "Chocolate Croissant",
                    Description = "A flaky croissant filled with rich chocolate.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Flour", "Butter", "Chocolate", "Sugar", "Yeast" },
                    FilterTags = new List<string> { "Pastry", "Chocolate", "Breakfast" },
                    Categories = new List<CategoryModel> { categories[1] },  // Grandma’s Pastries
                    ImagePath = "./Data/Images/Products/chocolate-croissant.webp"
                };

                var veganBrownie = new ProductModel
                {
                    Name = "Vegan Brownie",
                    Description = "A rich and fudgy brownie made without any animal products.",
                    Price = 3.49M,
                    Ingredients = new List<string> { "Flour", "Cocoa Powder", "Sugar", "Vegetable Oil", "Water" },
                    FilterTags = new List<string> { "Dessert", "Vegan", "Chocolate" },
                    Categories = new List<CategoryModel> { categories[1] },
                    ImagePath = "./Data/Images/Products/vegan-brownie.webp"
                };

                var glutenFreeMuffin = new ProductModel
                {
                    Name = "Gluten-Free Muffin",
                    Description = "A delicious muffin made with gluten-free ingredients.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Gluten-Free Flour", "Sugar", "Eggs", "Butter", "Milk" },
                    FilterTags = new List<string> { "Dessert", "Gluten-Free", "Muffin" },
                    Categories = new List<CategoryModel> { categories[1] },
                    ImagePath = "./Data/Images/Products/gluten-free-muffin.webp"
                };


                // Homemade Cakes
                var layerCake = new ProductModel
                {
                    Name = "Chocolate Layer Cake",
                    Description = "Rich chocolate cake layered with chocolate frosting.",
                    Price = 15.99M,
                    Ingredients = new List<string> { "Flour", "Cocoa Powder", "Sugar", "Eggs", "Butter" },
                    FilterTags = new List<string> { "Cake", "Chocolate" },
                    Categories = new List<CategoryModel> { categories[2] },  // Homemade Cakes
                    ImagePath = "./Data/Images/Products/chocolate-layer-cake.webp"
                };

                var redVelvetCake = new ProductModel
                {
                    Name = "Red Velvet Cake",
                    Description = "A moist red velvet cake with cream cheese frosting.",
                    Price = 18.99M,
                    Ingredients = new List<string> { "Flour", "Sugar", "Cocoa Powder", "Eggs", "Butter", "Red Food Coloring" },
                    FilterTags = new List<string> { "Cake", "Red Velvet" },
                    Categories = new List<CategoryModel> { categories[2] },  // Homemade Cakes
                    ImagePath = "./Data/Images/Products/red-velvet-cake.webp"
                };

                // Warm Drinks & Coffee
                var homebrewedCoffee = new ProductModel
                {
                    Name = "Homebrewed Coffee",
                    Description = "Freshly brewed coffee made from high-quality beans.",
                    Price = 2.49M,
                    Ingredients = new List<string> { "Coffee Beans", "Water" },
                    FilterTags = new List<string> { "Coffee", "Beverage" },
                    Categories = new List<CategoryModel> { categories[3] },  // Warm Drinks & Coffee
                    ImagePath = "./Data/Images/Products/homebrewed-coffee.webp"
                };

                var hotChocolate = new ProductModel
                {
                    Name = "Hot Chocolate",
                    Description = "Rich hot chocolate made with real cocoa.",
                    Price = 2.99M,
                    Ingredients = new List<string> { "Cocoa Powder", "Sugar", "Milk", "Vanilla" },
                    FilterTags = new List<string> { "Beverage", "Chocolate" },
                    Categories = new List<CategoryModel> { categories[3] },  // Warm Drinks & Coffee
                    ImagePath = "./Data/Images/Products/hot-chocolate.webp"
                };

                // Hearty Sandwiches
                var hamAndCheeseSandwich = new ProductModel
                {
                    Name = "Ham and Cheese Sandwich",
                    Description = "Classic ham and cheese sandwich on fresh bread.",
                    Price = 4.99M,
                    Ingredients = new List<string> { "Bread", "Ham", "Cheese", "Lettuce" },
                    FilterTags = new List<string> { "Sandwich", "Ham" },
                    Categories = new List<CategoryModel> { categories[4] },  // Hearty Sandwiches
                    ImagePath = "./Data/Images/Products/ham-and-cheese-sandwich.webp"
                };

                var smokedSalmonSandwich = new ProductModel
                {
                    Name = "Smoked Salmon Sandwich",
                    Description = "Delicious smoked salmon on artisanal bread.",
                    Price = 6.49M,
                    Ingredients = new List<string> { "Bread", "Smoked Salmon", "Cream Cheese", "Capers" },
                    FilterTags = new List<string> { "Sandwich", "Salmon" },
                    Categories = new List<CategoryModel> { categories[4] },  // Hearty Sandwiches
                    ImagePath = "./Data/Images/Products/smoked-salmon-sandwich.webp"
                };

                // Add products to the context
                context.Products.AddRange(
                    sourdoughBread, farmhouseBread,
                    cinnamonBun, almondTwist, chocolateCroissant,
                    layerCake, redVelvetCake, veganBrownie,
                    homebrewedCoffee, hotChocolate,
                    hamAndCheeseSandwich, smokedSalmonSandwich, glutenFreeMuffin
                );

                context.SaveChanges();

                // Update categories with products
                categories[0].Products.AddRange(new[] { sourdoughBread, farmhouseBread });  // Classic Breads
                categories[1].Products.AddRange(new[] { cinnamonBun, almondTwist, veganBrownie, chocolateCroissant, glutenFreeMuffin }); // Grandma’s Pastries
                categories[2].Products.AddRange(new[] { layerCake, redVelvetCake});  // Homemade Cakes
                categories[3].Products.AddRange(new[] { homebrewedCoffee, hotChocolate });  // Warm Drinks & Coffee
                categories[4].Products.AddRange(new[] { hamAndCheeseSandwich, smokedSalmonSandwich });  // Hearty Sandwiches



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