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
    }
}
