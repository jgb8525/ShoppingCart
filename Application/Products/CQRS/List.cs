using Application.Products.Dtos;
using Application.Transversal;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Products
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ProductDto>>>
        {
            public PagingParams Params { get; set; }
        }

        public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Query, Result<PagedList<ProductDto>>>
        {
            private readonly DataContext _context = context;
            private readonly IMapper _mapper = mapper;

            public async Task<Result<PagedList<ProductDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Products
                        .ProjectTo<ProductDto>(_mapper.ConfigurationProvider).Where(p => p.Stock > 0)
                        .AsQueryable();

                return Result<PagedList<ProductDto>>.Success(
                        await PagedList<ProductDto>.CreateAsync(query,
                                                                request.Params.PageNumber,
                                                                request.Params.PageSize)
                );
            }
        }
    }
}