namespace Backend.Entities
{
    public class PayoutSlot
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public bool IsPaidOut { get; set; }
        public DateOnly PayoutDate { get; set; }

        // Relationships
        public int CycleId { get; set; }
        public PayoutCycles PayoutCycle { get; set; } = new PayoutCycles();
                                                        
        public int UserId { get; set; }
        public User User { get; set; } = new User();
    }
}
