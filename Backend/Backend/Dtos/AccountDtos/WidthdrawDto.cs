using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.AccountDtos
{
    public class WidthdrawDto
    {
        [Required]
        public decimal Amount { get; set; }
    }
}
