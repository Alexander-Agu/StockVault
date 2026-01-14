using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class ResetPasswordDto
    {
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
