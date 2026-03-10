using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.JointAccountRepository
{
    public class JointAccountRepository(StockVaultContext context) : IJointAccountRepository
    {
        public async Task AddJointAccountAsync(JointAccount newAccount)
        {
            await context.JointAccounts.AddAsync(newAccount);
        }

        public async Task DeleteJointAccountByIdAsync(int userId, int accountId)
        {
            await context.JointAccounts.Where(j => j.UserId == userId && j.Id == accountId).ExecuteDeleteAsync();
        }

        public async Task<List<JointAccountDto>> GetAllJointTableAccountsAsync(int userId)
        {
            return await context.JointAccounts
                .Where(a => a.UserId == userId)
                .Select(a => new JointAccountDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    CreatedBy = a.UserId,
                    CreatedAt = a.CreatedAt,
                })
                .ToListAsync();
        }

        public async Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<JointAccountDto> GetJointTableAccountByIdAsync(int userId, int accountId)
        {
            return await context.JointAccounts
                .Where(a => a.UserId == userId && a.Id == accountId)
                .Select(a => new JointAccountDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    CreatedBy = a.UserId,
                    CreatedAt = a.CreatedAt,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<JointAccount> GetJointAccountByIdAsync(int userId, int accountId)
        {
            return await context.JointAccounts
                .Where(a => a.UserId == userId && a.Id == accountId)
                .FirstOrDefaultAsync();
        }

        public async Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId && a.Id == accountId)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> JointAccountExist(int userId, string title)
        {
            return await context.JointAccounts.Where(t => t.Title == title && t.UserId == userId).AnyAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
