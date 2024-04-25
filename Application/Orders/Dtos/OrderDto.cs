namespace Application.Orders.Dtos
{
    public class OrderDto
    {        
        public int Id { get; set; }
        public string OrderDate { get; set; }
        public double TotalInvoice { get; set; }
        public double TotalProducts { get; set; }
        public int UserId { get; set; }
        public List<OrderDetailDto> Items { get; set; }
    }
}