using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Transversal;
using Domain;
using MediatR;
using Persistence;

namespace Application.Products.CQRS
{
    public class Details
    {
        public class Query : IRequest<Result<Product>>
        {
            public int Id { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Query, Result<Product>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<Product>> Handle(Query request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync([request.Id], cancellationToken: cancellationToken);
                
                return Result<Product>.Success(product);
            }
        }
    }
}