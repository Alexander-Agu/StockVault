namespace Backend.Entities
{
    public class AccountLocks
    {
        public int Id { get; set; }
        public DateTime LockedUntil { get; set; }
        public bool Active { get; set; }


        // Relationships
        public int PersonalAccountId { get; set; } // One account can have one lock
        public PersonalAccount? PersonalAccount { get; set; }
    }
}
