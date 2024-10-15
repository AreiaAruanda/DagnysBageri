using backend.ViewModels;
using backend.Interfaces;

namespace backend.Services
{
    public class ProductService : IProductService
    {
        public async Task<List<ProductViewModel>> GetProductsAsync()
        {
            throw new NotImplementedException();
        }
}
}