namespace backend.ViewModels;

public class OrderItemViewModel
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public int ProductId { get; set; }
    public required ProductViewModel Product { get; set; }
}