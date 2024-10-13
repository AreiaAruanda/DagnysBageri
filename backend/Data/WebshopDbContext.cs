using Microsoft.EntityFrameworkCore;
using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace backend.Data
{
    public class WebshopDbContext : IdentityDbContext<IdentityUser>
    {
        public WebshopDbContext(DbContextOptions<WebshopDbContext> options) : base(options){}

        public DbSet<ProductModel> Products { get; set; }
        public DbSet<CategoryModel> Categories { get; set; }
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<OrderItemModel> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ProductModel>()
                .HasMany(p => p.Categories)
                .WithMany(c => c.Products)
                .UsingEntity(j => j.ToTable("ProductCategories"));

            builder.Entity<OrderModel>(entity =>
            {
                entity.HasMany(o => o.OrderItems)
                    .WithOne(oi => oi.Order)
                    .HasForeignKey(oi => oi.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<OrderItemModel>(entity =>
            {
                entity.HasOne(oi => oi.Product)
                    .WithMany()
                    .HasForeignKey(oi => oi.ProductId);
            });
        }
    }
}