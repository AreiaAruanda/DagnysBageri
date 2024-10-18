namespace backend.ViewModels;
public class OrderViewModel 
{
    public int Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Phone { get; set; }
    public required DateTime PickupDate { get; set; }
    public required DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public required List<OrderItemViewModel> OrderItems { get; set; }
    public string? Notes { get; set; }
    public required string Status { get; set; }
}