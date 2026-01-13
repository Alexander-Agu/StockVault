using Backend.Dtos.UserDtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.UserRepository;

namespace Backend.Services.UserService
{
    public class UserService(IUserRepository userRepository) : IUserService
    {
        public async Task<bool> RegisterUserAsync(CreateUserDto newUser)
        {
            // Checks if email already exists
            if (!await userRepository.EmailExistsAsync(newUser.Email)) return false;

            User user = newUser.ToEntity();

            userRepository.AddUserAsync(user);

            return true;
        }
    }
}
