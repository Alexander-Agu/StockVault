using Backend.Dtos.AuthenticationDto;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.UserDtos;

namespace Backend.Services.UserService
{
    public interface IUserService
    {
        /*
         * TODO: Register new user
         * 
         * Constraints
         *  1. All required data must be filled in
         *  2. Email must be unique
         *  3. Password must meet a requirements and must be hashed
         */
        public Task<ApiResponse<string>> RegisterUserAsync(CreateUserDto newUser);


        /*
         * TODO: Uses OTP to verify user's email
         */
        public Task<ApiResponse<string>> VerifyEmailAsync(string email, string otp);


        /*
         * TODO: Resends a new otp if it expired
         */
        public Task<ApiResponse<string>> ResendVarificationEmail(string email);


        /*
         * TODO: Logs user into their account
         */
        public Task<ApiResponse<TokenResponseDto>> LoginAsync(LoginDto login);


        /*
         * TODO: Logs user out of their account
         */
        public Task<ApiResponse<string>> LogoutAsync(int id);


        /*
         * TODO: Updates users profile
         * 
         * What to update:
         *  1. Firstname
         *  2. Lastname
         *  3. Phonenumber
         */
        public Task<ApiResponse<string>> UpdateProfileAsync(int id, UpdateProfileDto newProfile);


        /*
         * TODO: Gets the user's data
         */
        public Task<ApiResponse<ProfileDto>> GetProfileAsync(int id);


        /*
         * TODO: Sends an email to reset their password
         * 
         * How it works:
         * 1. Does not reveal whether email exists
         * 2. Generates a secure, time-limited reset token
         * 3. Sends password reset link via email
         */
        public Task<ApiResponse<string>> ForgotPasswordAsync(string email);


        /*
         * TODO: Resets user's password
         */
        public Task<ApiResponse<string>> ResetPasswordAsync(string token, ResetPasswordDto newPassword);
    }
}
