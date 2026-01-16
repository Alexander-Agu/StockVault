using System.Security.Cryptography;
using System.Text.RegularExpressions;
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
        public async Task<Dictionary<string, object>> RegisterUserAsync(CreateUserDto newUser)
        {
            // Checks if email already exists
            if (await userRepository.EmailExistsAsync(newUser.Email)) return Response("Error", "Please enter a valid email");

            User user = newUser.ToEntity();

            userRepository.AddUserAsync(user);

            

            // Once information is verified send an email to activate user's account
            await emailService.SendOtpEmailAsync(user.Email, user.Otp);

            return Response("Success", "Registration successful. Please verify your email.");
        }


        // Allows user to verify their email using an OTP
        public async Task<Dictionary<string, object>> VerifyEmailAsync(string email, string otp)
        {
            User? user = await userRepository.GetUserByEmailAsync(email);

            if (user == null) return Response("Error", "Please enter a valid email");

            // Validate user's OTP
            bool verify = otp == user.Otp && user.OtpExpirationTime < DateTime.Now;
            if (!verify) return Response("Error", "OTP has expired, please request a new one");

            // If OTP is valid
            user.Active = true;
            await userRepository.SaveChanges();

            return Response("Success", "Email has been varified");
        }


        // Login user
        public async Task<Dictionary<string, object>> LoginAsync(LoginDto login)
        {
            User? user = await userRepository.GetUserByEmailAsync(login.Email);
            if (user == null) return Response("Error", "Invalid email or password");

            // Check if password is valid
            if (user.PasswordHash != login.Password) return Response("Error", "Invalid email or password");

            // Check if user's email has been varified
            if (!user.Active) return Response("Error", "Invalid email or password");

            return Response("Success", "Logged in");
        }


        // Logout user
        public async Task<Dictionary<string, object>> LogoutAsync(int id)
        {
            User? User = await userRepository.GetUserByIdAsync(id);
            if (User == null) return Response("Error", "Failed to logoud");

            // Later just remove the access token
            return Response("Success", "logged out");
        }


        // Updates the users basic information
        public async Task<Dictionary<string, object>> UpdateProfileAsync(int id, UpdateProfileDto newProfile)
        {
            User? user = await userRepository.GetUserByIdAsync(id);
            if (user == null) return Response("Error", "User not found");

            // update first name
            if (user.FirstName != newProfile.FirstName && newProfile.FirstName != "") user.FirstName = newProfile.FirstName;

            // update last name
            if (user.LastName != newProfile.LastName && newProfile.LastName != "") user.LastName = newProfile.LastName;

            // Update phone number
            if (user.Phone != newProfile.Phone && ValidatePhoneNumber(newProfile.Phone)) user.Phone = newProfile.Phone;

            await userRepository.SaveChanges();

            return Response("Success", "Profile updated");

        }


        // Gets the user's profile
        public async Task<Dictionary<string, object>> GetProfileAsync(int id)
        {
            User? user = await userRepository.GetUserByIdAsync(id);
            if (user == null) return Response("Error", "User not found");

            return Response("Success", user.ToProfileDto());
        }


        // Allows user to request a password reset
        public async Task<Dictionary<string, object>> ForgotPasswordAsync(string email)
        {
            User? user = await userRepository.GetUserByEmailAsync(email);
            if (user == null && !user.Active) return Response("Error", "If the email exists, a password reset link has been sent.");

            user.PasswordToken = GenerateSecureToken();
            user.PasswordTokenExpiration = DateTime.UtcNow.AddMinutes(15);
            await userRepository.SaveChanges();

            // Send the email to the user
            await emailService.SendPasswordResetEmailAsync(user.Email, user.PasswordToken);

            return Response("Success", "If the email exists, a password reset link has been sent.");

        }


        // Allows users to reset their password
        public async Task<Dictionary<string, object>> ResetPasswordAsync(string token, ResetPasswordDto newPassword)
        {
            User? user = await userRepository.GetUserByPasswordToken(token);
            if (user == null) return Response("Error", "Token expired");

            user.PasswordHash = newPassword.Password;
            userRepository.SaveChanges();

            user.PasswordToken = "";
            await LogoutAsync(user.Id);

            return Response("Success", "Password reset successfully. Please log in again.");
        }


        // ----- HELPER METHODS ----- //


        /*
         * Creates a response message and returns it
        */
        private Dictionary<string, object> Response(string result, object message)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();

            response.Add("result", result);
            response.Add("message", message);
            return response;
        }


        /*
         * Validates south african number
        */
        private bool ValidatePhoneNumber(string num)
        {
            string pattern = @"^(?:\+27|0)(6|7|8)\d{8}$";
            Regex regex = new Regex(pattern);
            return regex.IsMatch(num);
        }

        private string GenerateSecureToken(int size = 32)
        {
            // Generate random bytes
            byte[] randomBytes = new byte[size];
            RandomNumberGenerator.Fill(randomBytes);

            // Convert the bytes to a Base64 string (which is URL-safe and compact)
            return Convert.ToBase64String(randomBytes);
        }
    }
}
