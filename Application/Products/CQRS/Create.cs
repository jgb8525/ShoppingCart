using Application.Products.Validators;
using Application.Transversal;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products.CQRS
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Product Product { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Product).SetValidator(new ProductValidator());
            }
        }

        public class Handler(DataContext context) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Products.Add(request.Product);
                var Result = await _context.SaveChangesAsync(cancellationToken) > 0;

                if (!Result)
                {
                    return Result<Unit>.Failure("Error to create the product ");
                }

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}