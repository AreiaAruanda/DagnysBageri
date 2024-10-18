using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.ViewModels;
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
    public async Task<IActionResult> UpdateOrderStatus([FromRoute] int id, [FromBody] UpdateOrderStatusViewModel request)
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