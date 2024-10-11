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
        public DbSet<OrderModel> Orders { get; set; }
        public DbSet<OrderItemModel> OrderItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<OrderModel>(entity =>
            {
                entity.HasMany(order => order.OrderItems)
                    .WithOne(orderItem => orderItem.Order)
                    .HasForeignKey(orderItem => orderItem.OrderId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            builder.Entity<OrderItemModel>(entity =>
            {
                entity.HasOne(orderItem => orderItem.Product)
                    .WithMany()
                    .HasForeignKey(orderItem => orderItem.ProductId);
            });
        }
    }
}