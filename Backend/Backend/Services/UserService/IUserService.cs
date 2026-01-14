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
    }
}
