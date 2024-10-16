using backend.Interfaces;
using System.IO.Abstractions;

namespace backend.Services;
public class ImageService : IImageService
{
    private readonly ILogger<ImageService> _logger;
    private readonly IFileSystem _fileSystem;

    public ImageService(IFileSystem filesystem, ILogger<ImageService> logger)
    {
        _logger = logger;
        _fileSystem = filesystem;
    }

    public string GetThumbnailPath(string imagePath)
    {
        try
        {
            string directory = _fileSystem.Path.GetDirectoryName(imagePath)!;
            string filename = _fileSystem.Path.GetFileNameWithoutExtension(imagePath);
            string extension = _fileSystem.Path.GetExtension(imagePath);

            return _fileSystem.Path.Combine(directory, $"{filename}-thumb{extension}");
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
            if (!_fileSystem.File.Exists(imagePath))
            {
                throw new FileNotFoundException("Image file not found", imagePath);
            }

            byte[] imageBytes = _fileSystem.File.ReadAllBytes(imagePath);
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