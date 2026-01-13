using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.UserRepository
{
    public class UserRepository(StockVaultContext context) : IUserRepository
    {
        // Adds new user to the database
        public async void AddUserAsync(User user)
        {
            await context.Users.AddAsync(user);
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await context.Users.Where(x => x.Email == email).AnyAsync();
        }
    }
}
