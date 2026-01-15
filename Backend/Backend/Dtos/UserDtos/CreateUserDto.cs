using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class CreateUserDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(20, MinimumLength = 3)]
        [EmailAddress]
        public required string Email { get; set; } = string.Empty;

        //[Required]
        [StringLength(10, MinimumLength = 9)]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [StringLength (64, MinimumLength = 8,
            ErrorMessage = "Password must have at least 8 characters in length"
            )]
        [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$",
            ErrorMessage = "Password must contain uppercase, lowercase, number, and special character."
            )]
        public string PasswordHash {  get; set; } = string.Empty;
    }
}
