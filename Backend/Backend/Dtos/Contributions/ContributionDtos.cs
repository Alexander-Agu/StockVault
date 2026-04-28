using Backend.Entities;

namespace Backend.Dtos.Contributions
{
    public class ContributionDtos
    {
        public int Id { get; set; }
        public int AmountCents { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateOnly PaidAt { get; set; }
        public DateOnly CreatedAt { get; set; }
        public int SlotId { get; set; }
        public int UserId { get; set; }
    }
}
