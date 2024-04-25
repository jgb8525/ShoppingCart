using Domain;

namespace Application.Products.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Stock { get; set; }
        public string ImageUrl { get; set; }
        public List<Category> Categories { get; set; }
    }
}