using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace backend.Models
{
    public class OrderModel
    {
    public int Id { get; set; }
    [MaxLength(50)]
    public required string FirstName { get; set; }

    [MaxLength(50)]
    public required string LastName { get; set; }
    public required string Email { get; set; }

    [DataType(DataType.PhoneNumber)]
    public required string Phone { get; set; }

    [DataType(DataType.Date)]
    public required DateTime PickupDate { get; set; }

    [DataType(DataType.Date)]
    public required DateTime OrderDate { get; set; }
    public decimal TotalAmount { get; set; }
    public required List<OrderItemModel> OrderItems { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }

    [DefaultValue("Pending")]
    public string? Status { get; set; }
    }
}