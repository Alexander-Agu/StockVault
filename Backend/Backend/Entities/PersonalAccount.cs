namespace Backend.Entities
{
    public class PersonalAccount
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int Balance { get; set; }
        public DateTime CreatedAt { get; set; }


        // Relationships
        public int UserId { get; set; } // One personal account belongs to one user
        public User? User { get; set; }

        public AccountLocks? AccountLock { get; set; }
    }
}
