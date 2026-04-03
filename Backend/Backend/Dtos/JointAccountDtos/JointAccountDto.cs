namespace Backend.Dtos.JointAccountDtos
{
    public class JointAccountDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public int CreatedBy { get; set; }
        public decimal Balance { get; set; }
        public int Members { get; set; }
        public bool isAdmin { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
