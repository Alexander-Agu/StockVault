using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.AccountDtos
{
    public class DepositDto
    {
        [Required]
        public float Amount { get; set; }
    }
}
