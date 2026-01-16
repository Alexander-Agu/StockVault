using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.AccountDtos
{
    public class CreateAccountDto
    {
        [Required]
        [StringLength(20, MinimumLength = 8, ErrorMessage = "Account name must at least have minimum of 8 characters")]
        public string Title { get; set; } = string.Empty;
    }
}
