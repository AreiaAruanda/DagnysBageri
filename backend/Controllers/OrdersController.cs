using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrdersController : ControllerBase
{

       private readonly WebshopDbContext _context;

        public OrdersController(WebshopDbContext context)
        {
            _context = context;
        }


        [HttpPost]
        public async Task<JsonResult> CreateOrder([FromBody] OrderModel order)
        {
            if (!ModelState.IsValid)
            {
                return new JsonResult(new { error = "Invalid order data" }) { StatusCode = 400 };
            }

            try
            {
                // Add the order to the context
                _context.Orders.Add(order);

                // Save changes to get the generated OrderId
                await _context.SaveChangesAsync();

                return new JsonResult(order) { StatusCode = 201 };
            }
            catch (DbUpdateException ex)
            {
                return new JsonResult(new { error = "Failed to create order" }) { StatusCode = 500 };
            }
            catch (Exception ex)
            {
                return new JsonResult(new { error = "Unexpected error occurred" }) { StatusCode = 500 };
            }
        }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        return await Task.FromResult(Ok());
    }

}