namespace Backend.Entities
{
    public class Contribution
    {
        public int Id { get; set; }
        public int AmountCents { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateOnly PaidOnly { get; set; }
        public DateOnly CreatedAt { get; set; }

        // Relationships
        public int CycleId { get; set; }
        public PayoutCycles Cycle { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
    }
}
