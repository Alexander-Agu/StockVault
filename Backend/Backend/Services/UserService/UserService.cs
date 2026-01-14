using Backend.Dtos.UserDtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.UserRepository;
using FIN.Service.EmailServices;

namespace Backend.Services.UserService
{
    public class UserService(IUserRepository userRepository, IEmailService emailService) : IUserService
    {
        // Regitser's user by saving their data in the DB
        // And sends back a verifiction email
        public async Task<bool> RegisterUserAsync(CreateUserDto newUser)
        {
            // Checks if email already exists
            if (!await userRepository.EmailExistsAsync(newUser.Email)) return false;

            User user = newUser.ToEntity();

            userRepository.AddUserAsync(user);

            

            // Once information is verified send an email to activate user's account
            await emailService.SendOtpEmailAsync(user.Email, user.Otp);

            return true;
        }

        // Allows user to verify their email using an OTP
        public async Task<bool> VerifyEmailAsync(string email, string otp)
        {
            User? user = await userRepository.GetUserByEmailAsync(email);

            if (user == null) return false;

            // Validate user's OTP
            bool verify = otp == user.Otp && user.OtpExpirationTime < DateTime.UtcNow;
            if (!verify) return false;

            // If OTP is valid
            user.Active = true;
            await userRepository.SaveChanges();

            return true;
        }
    }
}
