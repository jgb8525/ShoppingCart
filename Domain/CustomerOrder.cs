namespace Domain
{
    public class CustomerOrder
    {
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int OrderId { get; set; }
    }
}