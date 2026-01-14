using Backend.Dtos.UserDtos;
using Backend.Entities;
using System.Security.Cryptography;

namespace Backend.Mapping
{
    public static class UserMapping
    {
        public static User ToEntity(this CreateUserDto user)
        {
            return new User()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Phone = user.Phone,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                Otp = RandomNumberGenerator.GetInt32(100000, 1000000).ToString(),
                OtpExpirationTime = DateTime.UtcNow.AddMinutes(30)
            };
        }
    }
}
