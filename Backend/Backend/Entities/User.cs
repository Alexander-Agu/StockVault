namespace Backend.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;
        public string PasswordToken {  get; set; } = string.Empty;
        public DateTime PasswordTokenExpiration {  get; set; }

        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public bool Active { get; set; } = false;
        public string Otp { get; set; } = string.Empty;
        public DateTime OtpExpirationTime { get; set; }


        // Relationships
        public List<PersonalAccount> PersonalAccounts { get; set; } = new();
        public List<Transection> Transections { get; set; } = new();
        
    }
}
