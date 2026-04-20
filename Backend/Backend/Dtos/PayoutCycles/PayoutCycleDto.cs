using Backend.Entities;

namespace Backend.Dtos.PayoutCycles
{
    public class PayoutCycleDto
    {
        public int Id { get; set; }
        public int CycleNumber { get; set; }
        public int TotalMembersAtStart { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int JointAccountId { get; set; }
        public int ScheduleId { get; set; }
    }

    public class CreatePayoutCycleDto
    {
        public string Frequency { get; set; } = string.Empty;
    }
}
