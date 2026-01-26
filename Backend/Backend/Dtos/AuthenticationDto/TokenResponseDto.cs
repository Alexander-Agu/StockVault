namespace Backend.Dtos.AuthenticationDto
{
    public class TokenResponseDto
    {
        public int Id { get; set; }
        public string Token { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public DateTime RefreshTokenExpiryDate { get; set; }
    }
}
