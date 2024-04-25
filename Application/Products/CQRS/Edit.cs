using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Products.Validators;
using Application.Transversal;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Products.CQRS
{
    public class Edit
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

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var product = await _context.Products.FindAsync([request.Product.Id], cancellationToken: cancellationToken);
                if (product == null) return null;
                _mapper.Map(request.Product, product);

                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update the product");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}