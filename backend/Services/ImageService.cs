using backend.Interfaces;

namespace backend.Services;
public class ImageService : IImageService
{
    private readonly ILogger<ImageService> _logger;

    public ImageService(ILogger<ImageService> logger)
    {
        _logger = logger;
    }

    public string GetThumbnailPath(string imagePath)
    {
        try
        {
            string directory = Path.GetDirectoryName(imagePath) ?? throw new ArgumentException("Invalid image path", nameof(imagePath));
            string filename = Path.GetFileNameWithoutExtension(imagePath);
            string extension = Path.GetExtension(imagePath);

            return Path.Combine(directory, $"{filename}-thumb{extension}");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get thumbnail path");
            throw new Exception("Failed to get thumbnail path", ex);
        }
    }

    public string GetBase64String(string imagePath)
    {
        try
        {
            if (!File.Exists(imagePath))
            {
                throw new FileNotFoundException("Image file not found", imagePath);
            }

            byte[] imageBytes = File.ReadAllBytes(imagePath);
            string base64String = Convert.ToBase64String(imageBytes);
            string mimeType = "image/webp"; // Assuming all images are WebP

            return $"data:{mimeType};base64,{base64String}";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to get base64 string");
            throw new Exception("Failed to get base64 string", ex);
        }
    }
}