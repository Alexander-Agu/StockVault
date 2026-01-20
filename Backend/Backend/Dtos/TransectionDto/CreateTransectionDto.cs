using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.TransectionDto
{
    public class CreateTransectionDto
    {
        [Required]
        public int AccountId { get; set; }

        [Required]
        public string AccountType { get; set; } = string.Empty;

        [Required]
        public int AmountCents { get; set; }

        [Required]
        public string TransectionType { get; set; } = string.Empty;

        public DateOnly CreatedAt { get; set; }
    }
}
