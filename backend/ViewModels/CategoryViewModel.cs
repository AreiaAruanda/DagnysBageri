using backend.Models;

namespace backend.ViewModels;

public class CategoryViewModel
{
    // Primary key for the CategoryModel
    public int Id { get; set; }
    public required string Name { get; set; }
    public required string CategoryURL { get; set; }
}