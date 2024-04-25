using Domain;
using FluentValidation;

namespace Application.Products.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(x => x.Title).NotEmpty();
        }
    }
}