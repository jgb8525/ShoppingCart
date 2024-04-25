namespace Domain
{
    public class ProductStock
    {
        public int Id { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public string BatchCode { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
    }
}