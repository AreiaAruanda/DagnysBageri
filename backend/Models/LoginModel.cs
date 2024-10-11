using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class LoginModel
    {
        public required string Username { get; set; }

        [RegularExpression("^(?=.*[!@#$%^&*\\\"(),.?:{}|<>])(?=.*[A-ZÅÄÖ])(?=.*[a-zåäö])(?=.*\\d)[\\s\\S]{8,255}$", ErrorMessage = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character.")]
        public required string Password { get; set; }
    }
}