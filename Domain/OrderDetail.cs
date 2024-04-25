namespace Domain
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public int ProductId { get; set; }
         public Product Product { get; set; }
        public double Quantity { get; set; }
        public double TotalPrice   { get; set; }
    }
}