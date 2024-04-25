using Application.Orders.CQRS;
using Application.Orders.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class OrderController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> CreateOrder(OrderDto order)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Order = order }));
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> Getorders(int id)
        {
            return HandleResult(await Mediator.Send(new List.Query { UserId = id }));
        }
    }
}