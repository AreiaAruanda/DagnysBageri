using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;
using backend.ViewModels;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly WebshopDbContext _context;

        public OrdersController(WebshopDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder()
        {
            return await Task.FromResult(Ok());
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            // Transform the data into ViewModels 
            var orderViewModels = orders.Select(order => new OrderViewModel 
            {
                Id = order.Id,
                FirstName = order.FirstName,
                LastName = order.LastName,
                Email = order.Email,
                Phone = order.Phone,
                PickupDate = order.PickupDate,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                Notes = order.Notes,
                Status = order.Status!,
                OrderItems = order.OrderItems.Select(item => new OrderItemViewModel
                {
                    Id = item.Id,
                    Quantity = item.Quantity,
                    ProductId = item.ProductId,
                    Product = new ProductViewModel
                    {
                        Id = item.Product.Id,
                        Name = item.Product.Name,
                        Description = item.Product.Description,
                        Price = item.Product.Price,
                        FilterTags = item.Product.FilterTags,
                        Ingredients = item.Product.Ingredients,
                    }
                }).ToList()
            }).ToList();

            return Ok(orderViewModels);
        }
    }
}