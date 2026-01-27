using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using Backend.Dtos.AuthenticationDto;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.UserDtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.UserRepository;
using FIN.Service.EmailServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Services.UserService
{
    public class UserService(
        IUserRepository userRepository, 
        IEmailService emailService,
        IConfiguration configuration) : IUserService
    {
        // Regitser's user by saving their data in the DB
        // And sends back a verifiction email
        public async Task<ApiResponse<string>> RegisterUserAsync(CreateUserDto newUser)
        {
            ApiResponse<string> response = new ApiResponse<string>() {
                ResponseCode = ResponseCode.Created,
                Message = "Registration successful. Please verify your email.",
                Data = ""
            };

            // Checks if email already exists
            if (await userRepository.EmailExistsAsync(newUser.Email))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Please enter a valid email";

                return response;
            }

            User user = newUser.ToEntity();

            user.PasswordHash = HashPassword(user, newUser.PasswordHash);

            userRepository.AddUserAsync(user);

            

            // Once information is verified send an email to activate user's account
            await emailService.SendOtpEmailAsync(user.Email, user.Otp);

            return response;
        }


        // Allows user to verify their email using an OTP
        public async Task<ApiResponse<string>> VerifyEmailAsync(string email, string otp)
        {
            ApiResponse<string> response = new ApiResponse<string>() { 
                ResponseCode = ResponseCode.Ok,
                Message = "Email has been varified",
                Data = ""
            };

            User? user = await userRepository.GetUserByEmailAsync(email);

            if (user == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Please enter a valid email";

                return response;
            }

            // Validate user's OTP
            bool verify = otp == user.Otp && user.OtpExpirationTime < DateTime.Now;
            if (!verify)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "OTP has expired, please request a new one";

                return response;
            }

            // If OTP is valid
            user.Active = true;
            await userRepository.SaveChanges();

            return response;
        }


        // Login user
        public async Task<ApiResponse<TokenResponseDto>> LoginAsync(LoginDto login)
        {
            ApiResponse<TokenResponseDto> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Logged in",
                Data = null
            };
            User? user = await userRepository.GetUserByEmailAsync(login.Email);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Invalid email or password";

                return response;
            }

            // Check if password is valid and user's email has been varified
            if (!ValidateHashedPassword(user, login.Password) || !user.Active)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Invalid email or password";

                return response;
            }

            // Saving user's refresh tokens
            SaveRefreshToken(user);

            // returning Token Response
            TokenResponseDto tokenResponse = user.ToTokenResponse();
            tokenResponse.Token = CreateToken(user);

            response.Data = tokenResponse;

            return response;
        }


        // Logout user
        public async Task<ApiResponse<string>> LogoutAsync(int id)
        {
            ApiResponse<string> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "logged out",
                Data = ""
            };

            User? User = await userRepository.GetUserByIdAsync(id);
            if (User == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Failed to logoud";

                return response;
            }

            // Later just remove the access token
            return response;
        }


        // Updates the users basic information
        public async Task<ApiResponse<string>> UpdateProfileAsync(int id, UpdateProfileDto newProfile)
        {       
            ApiResponse<string> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Profile updated",
                Data = ""
            };

            User? user = await userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "User not found";

                return response;
            }

            // update first name
            if (user.FirstName != newProfile.FirstName && newProfile.FirstName != "") user.FirstName = newProfile.FirstName;

            // update last name
            if (user.LastName != newProfile.LastName && newProfile.LastName != "") user.LastName = newProfile.LastName;

            // Update phone number
            if (user.Phone != newProfile.Phone && ValidatePhoneNumber(newProfile.Phone)) user.Phone = newProfile.Phone;

            await userRepository.SaveChanges();

            return response;

        }


        // Gets the user's profile
        public async Task<ApiResponse<ProfileDto>> GetProfileAsync(int id)
        {
            ApiResponse<ProfileDto> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Data retrieved",
                Data = null
            };

            User? user = await userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User not found";

                return response;
            }

            response.Data = user.ToProfileDto();

            return response;
        }


        // Allows user to request a password reset
        public async Task<ApiResponse<string>> ForgotPasswordAsync(string email)
        {
            ApiResponse<string> response = new() {
                ResponseCode = ResponseCode.Ok,
                Message = "If the email exists, a password reset link has been sent.",
                Data = ""
            };
            User? user = await userRepository.GetUserByEmailAsync(email);
            if (user == null && !user.Active)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "If the email exists, a password reset link has been sent.";

                return response;
            }

            user.PasswordToken = GenerateSecureToken();
            user.PasswordTokenExpiration = DateTime.UtcNow.AddMinutes(15);
            await userRepository.SaveChanges();

            // Send the email to the user
            await emailService.SendPasswordResetEmailAsync(user.Email, user.PasswordToken);

            return response;

        }


        // Allows users to reset their password
        public async Task<ApiResponse<string>> ResetPasswordAsync(string token, ResetPasswordDto newPassword)
        {
            ApiResponse<string> response = new() {
                ResponseCode = ResponseCode.Ok,
                Message = "Password reset successfully. Please log in again.",
                Data = ""
            };

            User? user = await userRepository.GetUserByPasswordToken(token);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Token expired";

                return response;
            }

            user.PasswordHash = HashPassword(user, newPassword.Password);
            await userRepository.SaveChanges();

            user.PasswordToken = "";
            await LogoutAsync(user.Id);

            return response;
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
         * TODO: Returns a string of a hashed password
         */
        private string HashPassword(User user, string password)
        {
            return new PasswordHasher<User>()
                .HashPassword(user, password);
        }


        /*
         * TODO: Returns a bool to validate a hashed password
         */
        private bool ValidateHashedPassword(User user, string password)
        {
            return new PasswordHasher<User>()
                .VerifyHashedPassword(user, user.PasswordHash, password)
                == PasswordVerificationResult.Success;
        }


        /*
         * TODO: Creates a json web token
         */
        private string CreateToken(User user)
        {
            var claims = new List<Claim> { 
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.FirstName + " " +  user.LastName)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("AppSettings:Token")!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                    issuer: configuration.GetValue<string>("AppSettings:Issuer"),
                    audience: configuration.GetValue<string>("AppSettings:Audience"),
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }


        /*
         * TODO: Generates a refresh token string
         */
        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }


        /*
         * TODO: Allows refresh token to be saved in the database
         */
        private async void SaveRefreshToken(User user)
        {
            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiryDate = DateTime.UtcNow.AddDays(7);
            await userRepository.SaveChanges();
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
