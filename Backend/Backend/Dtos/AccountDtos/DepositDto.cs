using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.AccountDtos
{
    public class DepositDto
    {
        [Required]
        public int Amount { get; set; }
    }
}
