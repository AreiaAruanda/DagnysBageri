using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    // WebshopDbContext class inherits from IdentityDbContext to include Identity functionality
    public class WebshopDbContext : IdentityDbContext<IdentityUser>
    {
        // Constructor that accepts DbContextOptions and passes it to the base class constructor
        public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options) {}

        // DbSet properties for each model to be included in the database
        public DbSet<ProductModel> Products { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<OrderItemModel> OrderItems { get; set; }

        // Override OnModelCreating to configure the model relationships
        protected override void OnModelCreating(ModelBuilder builder)
        {
            // Call the base class OnModelCreating method
            base.OnModelCreating(builder);

            // Configure many-to-many relationship between ProductModel and CategoryModel
            builder.Entity<ProductModel>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products)
                .UsingEntity(j => j.ToTable("ProductCategories")); // Specify join table name

            // Configure one-to-many relationship between OrderItemModel and ProductModel
            builder.Entity<OrderItemModel>(entity =>
            {
                entity.HasOne(oi => oi.Product)
                    .WithMany()
                    .HasForeignKey(oi => oi.ProductId); // Foreign key in OrderItemModel referencing ProductModel
            });

            // Set up default value for OrderModel.Status
            builder.Entity<OrderModel>(entity =>
            {
                entity.Property(o => o.Status)
                .HasDefaultValue("Pending");
            });
        }
    }
}