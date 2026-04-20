namespace Backend.Entities
{
    public class PayoutCycles
    {
        public int Id { get; set; }
        public int CycleNumber { get; set; }
        public int TotalMembersAtStart { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }

        // Relationships
        public int JointAccountId { get; set; }
        public JointAccount JointAccount { get; set; } = new();
        
        public int ScheduleId { get; set; }
        public ContributionSchedule Schedule { get; set; } = new();
    }
}
