namespace Backend.Dtos.PersonalAccountDtos
{
    public class PersonalAccountDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Balance { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateOnly LockedUntil { get; set; }
        public bool IsActive { get; set; }
    }
}
