using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.ViewModels;
using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.Models;

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
                .Include(o => o.OrderItems!)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }


        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateOrderStatus([FromRoute] int id, [FromBody] UpdateOrderStatusViewModel request )
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            order.Status = request.Status;
            await _context.SaveChangesAsync();

            return Ok(order);
        }
    }
}