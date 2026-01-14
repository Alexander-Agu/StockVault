using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.UserRepository
{
    public class UserRepository(StockVaultContext context) : IUserRepository
    {
        // Saves database changes
        public async Task SaveChanges()
        {
            await context.SaveChangesAsync();
        }


        // Adds new user to the database
        public async void AddUserAsync(User user)
        {
            await context.Users.AddAsync(user);
            await SaveChanges();
        }

        // Checks if user email exists
        public async Task<bool> EmailExistsAsync(string email)
        {
            return await context.Users.Where(x => x.Email == email).AnyAsync();
        }

        // Fetches user by EMAIL
        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await context.Users.Where(user => email == user.Email).FirstOrDefaultAsync();
        }

        // Fetches user by ID
        public async Task<User> GetUserByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }


    }
}
