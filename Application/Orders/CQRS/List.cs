using Application.Orders.Dtos;
using Application.Products.Dtos;
using Application.Transversal;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Orders.CQRS
{
    public class List
    {
        public class Query : IRequest<Result<List<OrderDto>>>
        {
            public int UserId { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Query, Result<List<OrderDto>>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<List<OrderDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var orders = await _context.Orders
                            .Where(or => or.Customer.Id == request.UserId)
                            .Include(p => p.OrderDetails)
                            .ThenInclude(p => p.Product)
                            .Include(p => p.Customer).ToListAsync(cancellationToken: cancellationToken);

                var orderDto = new List<OrderDto>();

                foreach (var item in orders)
                {
                    var itemDto = new OrderDto
                    {
                        Id = item.Id,
                        UserId = item.Customer.Id,
                        OrderDate = item.CreatedDate.ToShortDateString(),
                        Items = [],
                        TotalProducts = item.OrderDetails.Sum(x => x.Quantity),
                        TotalInvoice = item.OrderDetails.Sum(x => x.TotalPrice)
                    };

                    foreach (var det in item.OrderDetails)
                    {
                        itemDto.Items.Add(new OrderDetailDto
                        {
                            Product = new ProductDto { Description = det.Product.Description, ProductCode = det.Product.ProductCode, Price = det.Product.Price },
                            Quantity = det.Quantity
                        });
                    }

                    orderDto.Add(itemDto);
                }

                return Result<List<OrderDto>>.Success(orderDto);
            }
        }
    }
}