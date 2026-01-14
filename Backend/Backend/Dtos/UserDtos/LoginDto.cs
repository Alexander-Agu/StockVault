using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class LoginDto
    {
        [Required]
        [StringLength(20, MinimumLength = 3)]
        [EmailAddress]
        public required string Email { get; set; } = string.Empty;


        [Required]
        [StringLength(64, MinimumLength = 8,
            ErrorMessage = "Password must have at least 8 characters in length"
            )]
        [RegularExpression(
            @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$",
            ErrorMessage = "Password must contain uppercase, lowercase, number, and special character."
            )]
        public string Password { get; set; } = string.Empty;
    }
}
