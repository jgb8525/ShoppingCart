namespace Domain
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public ICollection<ProductCategory> Products { get; set; }
    }
}