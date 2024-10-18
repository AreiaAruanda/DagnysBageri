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
                .Include(o => o.OrderItems!)
                .ThenInclude(oi => oi.Product)
                .ToListAsync();

            if (orders == null)
            {
                return NotFound();
            }

            return Ok(orders);
        }
    }
}