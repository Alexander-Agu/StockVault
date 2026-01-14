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
        public Task<bool> RegisterUserAsync(CreateUserDto newUser);


        /*
         * TODO: Uses OTP to verify user's email
         */
        public Task<bool> VerifyEmailAsync(string email, string otp);


        /*
         * TODO: Logs user into their account
         */
        public Task<bool> LoginAsync(LoginDto login);


        /*
         * TODO: Logs user out of their account
         */
        public Task<bool> LogoutAsync(int id);
    }
}
