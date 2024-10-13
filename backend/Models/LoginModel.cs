using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LoginModel
    {
        // Username for login
        public required string Username { get; set; }

        // Password for login with validation requirements:
        // - At least 8 characters long
        // - Contains at least one uppercase letter
        // - Contains at least one lowercase letter
        // - Contains at least one number
        // - Contains at least one special character
        [RegularExpression("^(?=.*[!@#$%^&*\\\"(),.?:{}|<>])(?=.*[A-ZÅÄÖ])(?=.*[a-zåäö])(?=.*\\d)[\\s\\S]{8,255}$", ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.")]
        public required string Password { get; set; }
    }
}