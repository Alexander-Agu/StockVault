using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class UpdateProfileDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string LastName { get; set; } = string.Empty;

        [Required]
        [StringLength(10, MinimumLength = 9)]
        public string Phone { get; set; } = string.Empty;
    }
}
