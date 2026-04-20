namespace Backend.Entities
{
    public class ContributionSchedule
    {
        public int Id { get; set; }
        public int JointAccountId { get; set; }
        public int AmountCents { get; set; }
        public string Frequency { get; set; } = "MONTHLY"; // WEEKLY / MONTHLY
        public DateOnly StartDate { get; set; }
        public bool IsActive { get; set; } = false;
        public DateTime CreatedAt { get; set; }

        // Relationships
        public JointAccount? JointAccount { get; set; }
        public PayoutCycles? PayoutCycle { get; set; }
    }
}