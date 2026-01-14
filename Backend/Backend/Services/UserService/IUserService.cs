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
        public Task<Dictionary<string, object>> RegisterUserAsync(CreateUserDto newUser);


        /*
         * TODO: Uses OTP to verify user's email
         */
        public Task<Dictionary<string, object>> VerifyEmailAsync(string email, string otp);


        /*
         * TODO: Logs user into their account
         */
        public Task<Dictionary<string, object>> LoginAsync(LoginDto login);


        /*
         * TODO: Logs user out of their account
         */
        public Task<Dictionary<string, object>> LogoutAsync(int id);


        /*
         * TODO: Updates users profile
         * 
         * What to update:
         *  1. Firstname
         *  2. Lastname
         *  3. Phonenumber
         */
        public Task<Dictionary<string, object>> UpdateProfileAsync(int id, UpdateProfileDto newProfile);


        /*
         * TODO: Gets the user's data
         */
        public Task<Dictionary<string, object>> GetProfile(int id);


        /*
         * TODO: Sends an email to reset their password
         * 
         * How it works:
         * 1. Does not reveal whether email exists
         * 2. Generates a secure, time-limited reset token
         * 3. Sends password reset link via email
         */
        public Task<Dictionary<string, object>> ForgotPasswordAsync(string email);


        /*
         * TODO: Resets user's password
         */
        public Task<Dictionary<string, object>> ResetPasswordAsync(string token, ResetPasswordDto newPassword);
    }
}
