using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/orders")]
public class OrdersController : ControllerBase
{

    [HttpPost]
    public async Task<IActionResult> CreateOrder()
    {
        return await Task.FromResult(Ok());
    }

    [HttpGet]
    public async Task<IActionResult> GetOrders()
    {
        return await Task.FromResult(Ok());
    }

}