namespace Backend.Entities
{
    public class Transection
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public string AccountType { get; set; } = string.Empty;
        public int AmountCents { get; set; }
        public string TransectionType { get; set; } = string.Empty;
        public DateOnly CreatedAt { get; set; }


        // Relationships
        public int userId { get; set; }
        public User? User { get; set; }
    }
}
