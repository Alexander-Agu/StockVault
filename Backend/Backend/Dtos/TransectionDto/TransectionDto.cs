using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.TransectionDto
{
    public class TransectionDto
    {
        public int transectionId { get; set; }
        public int AccountId { get; set; }
        public string AccountType { get; set; } = string.Empty;
        public string UserName { get; set; } = string.Empty;
        public int AmountCents { get; set; }
        public string TransectionType { get; set; } = string.Empty;
        public DateOnly CreatedAt { get; set; }
    }
}
