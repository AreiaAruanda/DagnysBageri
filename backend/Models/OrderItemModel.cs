namespace backend.Models
{
    public class OrderItemModel
    {
        // Primary key for the OrderItemModel
        public int Id { get; set; }

        // Quantity of the product in the order
        public int Quantity { get; set; }

        // Foreign key referencing the ProductModel
        public int ProductId { get; set; }

        // Navigation property for the associated product
        public ProductModel? Product { get; set; }

    }
}