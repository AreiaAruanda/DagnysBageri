using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.ViewModels
{
    public class ProductViewModel
    {
        // Primary key for the ProductModel
        public int Id { get; set; }

        // Name of the product
        public string? Name { get; set; }

        // Description of the product
        public string? Description { get; set; }

        // Price of the product, formatted as currency with two decimal places
        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Price { get; set; }

        // List of tags for filtering products
        public List<string>? FilterTags { get; set; }

        // List of ingredients in the product
        public List<string>? Ingredients { get; set; }

        // List of categories the product belongs to
        public List<string>? Categories { get; set; }
        
        public string? Thumbnail { get; set; }

        public string? Image { get; set; }
    }
}