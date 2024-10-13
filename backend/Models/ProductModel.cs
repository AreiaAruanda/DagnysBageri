using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Price { get; set; }
        public required List<string> FilterTags { get; set; }
        public required List<string> Ingredients { get; set; }
        public required List<CategoryModel> Categories { get; set; } 
    }
}