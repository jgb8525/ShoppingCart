using Application.Orders.Dtos;
using Application.Transversal;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Orders.CQRS
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public OrderDto Order { get; set; }
        }
        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;            

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var order = new Order
                {
                    Customer = _context.Customers.Find(request.Order.UserId),
                    CreatedDate = DateTime.Now,
                    OrderDetails = []
                };

                request.Order.Items.ForEach(x =>
                {
                    order.OrderDetails.Add(new OrderDetail
                    {
                        Order = order,
                        Quantity = x.Quantity,
                        TotalPrice = x.Product.Price * x.Quantity,
                        Product = _context.Products.Find(x.Product.Id)
                    });
                    
                    var productsWithStock = _context.ProductStock.Where(p => p.ProductId == x.Product.Id && p.Status.Equals("S"))
                                                                 .Take(Convert.ToInt32(x.Quantity));
                    foreach (var item in productsWithStock)
                    {
                        item.Status = "O";
                    }
                });

                _context.Orders.Add(order);

                var Result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!Result) 
                {
                    return Result<Unit>.Failure("Failed to create the Order ");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}