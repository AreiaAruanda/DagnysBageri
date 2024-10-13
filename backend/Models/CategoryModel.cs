namespace backend.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }    
        public required List<ProductModel> Products { get; set; }
    }
}