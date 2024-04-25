using Application.Products.Dtos;

namespace Application.Orders.Dtos
{
    public class OrderDetailDto
    {
        public ProductDto Product { get; set; }
        public double Quantity { get; set; }
    }
}