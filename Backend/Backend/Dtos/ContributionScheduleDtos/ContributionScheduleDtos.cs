namespace Backend.Dtos.ContributionScheduleDtos
{
    public class CreateScheduleDto
    {
        public int AmountCents { get; set; }
        public string Frequency { get; set; } = "MONTHLY";
        public DateOnly StartDate { get; set; }
    }

    public class UpdateFrequencyDto
    {
        public string Frequency { get; set; } = string.Empty;
    }

    public class ScheduleDto
    {
        public int Id { get; set; }
        public float Amount { get; set; }
        public string Frequency { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public bool IsActive { get; set; }
    }
}