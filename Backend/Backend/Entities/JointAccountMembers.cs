namespace Backend.Entities
{
    public class JointAccountMembers
    {
        public int Id { get; set; }
        public int JointAccountId { get; set; }
        public int UserId { get; set; }
        public string Role { get; set; } = "MEMBER";
        public DateTime JoinedAt { get; set; }

        // Relationships
        public JointAccount? JointAccount { get; set; }
        public User? User { get; set; }
    }
}
