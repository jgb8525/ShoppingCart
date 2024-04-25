namespace Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Stock { get; set; }
        public string ImageUrl { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<ProductStock> ProductStock { get; set; }
        public ICollection<ProductCategory> Categories { get; set; }
    }
}