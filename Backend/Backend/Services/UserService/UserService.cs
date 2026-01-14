using Backend.Dtos.UserDtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.UserRepository;
using FIN.Service.EmailServices;

namespace Backend.Services.UserService
{
    public class UserService(IUserRepository userRepository, IEmailService emailService) : IUserService
    {
        public async Task<bool> RegisterUserAsync(CreateUserDto newUser)
        {
            // Checks if email already exists
            if (!await userRepository.EmailExistsAsync(newUser.Email)) return false;

            User user = newUser.ToEntity();

            userRepository.AddUserAsync(user);

            user.otp = new Random().Next(100000, 999999).ToString();

            // Once information is verified send an email to activate user's account
            await emailService.SendOtpEmailAsync(user.Email, user.otp);

            return true;
        }
    }
}
