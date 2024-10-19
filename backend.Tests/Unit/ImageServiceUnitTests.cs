using System.Text;
using Moq;
using Microsoft.Extensions.Logging;
using System.IO.Abstractions;
using backend.Services;

namespace backend.Tests.Unit;
public class ImageServiceUnitTests
{
    private readonly ImageService _imageService;
    private readonly Mock<IFileSystem> _fileSystemMock;
    private readonly Mock<ILogger<ImageService>> _loggerMock;

    public ImageServiceUnitTests()
    {
        _fileSystemMock = new Mock<IFileSystem>();
        _loggerMock = new Mock<ILogger<ImageService>>();
        _imageService = new ImageService(_fileSystemMock.Object, _loggerMock.Object);
    }

    [Fact]
    public void GetThumbnailPath_ShouldReturnCorrectThumbnailPath()
    {
        // Arrange
        string imagePath = "images/sample.jpg";
        string expectedThumbnailPath = Path.Combine("images", "sample-thumb.jpg");

        _fileSystemMock.Setup(fs => fs.Path.GetDirectoryName(imagePath)).Returns("images");
        _fileSystemMock.Setup(fs => fs.Path.GetFileNameWithoutExtension(imagePath)).Returns("sample");
        _fileSystemMock.Setup(fs => fs.Path.GetExtension(imagePath)).Returns(".jpg");
        _fileSystemMock.Setup(fs => fs.Path.Combine("images", "sample-thumb.jpg")).Returns(expectedThumbnailPath);

        // Act
        string result = _imageService.GetThumbnailPath(imagePath);

        // Assert
        Assert.Equal(expectedThumbnailPath, result);
    }

    [Fact]
    public void GetThumbnailPath_ShouldLogErrorAndThrowException_WhenGeneralExceptionOccurs()
    {
        // Arrange
        string imagePath = "images/sample.jpg";
        _fileSystemMock.Setup(fs => fs.Path.GetDirectoryName(It.IsAny<string>())).Throws(new IOException("IO error"));

        // Act & Assert
        var exception = Assert.Throws<Exception>(() => _imageService.GetThumbnailPath(imagePath));
        Assert.Equal("Failed to get thumbnail path", exception.Message);
    }

    [Fact]
    public void GetBase64String_ShouldReturnBase64String_WhenFileExists()
    {
        // Arrange
        string imagePath = "images/sample.webp";
        byte[] imageBytes = Encoding.UTF8.GetBytes("fake image content");
        string expectedBase64String = $"data:image/webp;base64,{Convert.ToBase64String(imageBytes)}";

        _fileSystemMock.Setup(fs => fs.File.Exists(imagePath)).Returns(true);
        _fileSystemMock.Setup(fs => fs.File.ReadAllBytes(imagePath)).Returns(imageBytes);

        // Act
        string result = _imageService.GetBase64String(imagePath);

        // Assert
        Assert.Equal(expectedBase64String, result);
    }

    [Fact]
    public void GetBase64String_ShouldThrowFileNotFoundException_WhenFileDoesNotExist()
    {
        // Arrange
        string imagePath = "images/sample.webp";

        _fileSystemMock.Setup(fs => fs.File.Exists(imagePath)).Returns(false);

        // Act & Assert
        var exception = Assert.Throws<Exception>(() => _imageService.GetBase64String(imagePath));
        Assert.IsType<FileNotFoundException>(exception.InnerException);
    }
}