using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.AccountLockDtos
{
    public class LockAccountDto
    {
        [Required]
        public DateOnly LockDate { get; set; }
    }
}
