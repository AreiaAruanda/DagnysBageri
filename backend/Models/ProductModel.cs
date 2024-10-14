using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ProductModel
    {
        // Primary key for the ProductModel
        public int Id { get; set; }

        // Name of the product
        public required string Name { get; set; }

        // Description of the product
        public required string Description { get; set; }

        // Price of the product, formatted as currency with two decimal places
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }

        // List of tags for filtering products
        public required List<string> FilterTags { get; set; }

        // List of ingredients in the product
        public required List<string> Ingredients { get; set; }

        // List of categories the product belongs to
        public required List<CategoryModel> Categories { get; set; }

        // Image path for the product
        public required string ImagePath { get; set; }
    }
}