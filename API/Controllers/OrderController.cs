using Application.Orders.CQRS;
using Application.Orders.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseController
    {
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrders(int id)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserId = id }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto order)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Order = order }));
        }
    }
}