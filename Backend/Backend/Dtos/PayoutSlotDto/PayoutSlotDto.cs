namespace Backend.Dtos.PayoutSlotDto
{
    public class PayoutSlotDto
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public bool IsPaidOut { get; set; }
        public DateOnly PayoutDate { get; set; }
        public int CycleId { get; set; }
        public int UserId { get; set; }
    }
}
