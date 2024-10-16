namespace backend.Models
{
    public class CategoryModel
    {
        // Primary key for the CategoryModel
        public int Id { get; set; }

        // Name of the category
        public required string Name { get; set; }

        // List of products that belong to this category
        public required List<ProductModel> Products { get; set; }

        public required string CategoryURL { get; set; }
    }
}