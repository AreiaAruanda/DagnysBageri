using backend.ViewModels;

namespace backend.Interfaces;
public interface IProductService
{
    Task<List<ProductViewModel>> GetProductsAsync();
}