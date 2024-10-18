using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace backend.Models
{
    public class OrderModel
    {
        // Primary key for the OrderModel
        public int Id { get; set; }

        // First name of the customer, with a maximum length of 50 characters
        [MaxLength(50)]
        public required string FirstName { get; set; }

        // Last name of the customer, with a maximum length of 50 characters
        [MaxLength(50)]
        public required string LastName { get; set; }

        // Email address of the customer
        public required string Email { get; set; }

        // Phone number of the customer, formatted as a phone number
        [DataType(DataType.PhoneNumber)]
        public required string Phone { get; set; }

        // Date when the customer will pick up the order, formatted as a date
        [DataType(DataType.Date)]
        public required DateTime PickupDate { get; set; }

        // Date when the order was placed, formatted as a date
        [DataType(DataType.Date)]
        public required DateTime OrderDate { get; set; }

        // Total amount for the order
        public decimal TotalAmount { get; set; }

        // List of items included in the order
        public List<OrderItemModel>? OrderItems { get; set; }

        // Additional notes for the order, with a maximum length of 500 characters
        [MaxLength(500)]
        public string? Notes { get; set; }

        // Status of the order, with a default value of "Pending"
        [DefaultValue("Pending")]
        public string? Status { get; set; }
    }
}