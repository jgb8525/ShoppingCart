using Application.Transversal;
using MediatR;
using Persistence;

namespace Application.Products.CQRS
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public int Id { get; set; }
        }

        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync(request.Id);
                
                if (product == null)
                {
                    return null;
                }

                _context.Remove(product);
                
                var result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!result) 
                {
                    return Result<Unit>.Failure("Error to delete the product ");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}