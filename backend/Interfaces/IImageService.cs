using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Interfaces
{
    public interface IImageService
    {
        public string GetThumbnailPath(string imagePath);
        public string GetBase64String(string imagePath);    
    }
}