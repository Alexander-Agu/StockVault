using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;
using Stripe;

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
            await context.JointAccounts.Where(j => j.Id == accountId && (j.UserId == userId || context.JointAccountMembers.Any(m => m.JointAccountId == accountId && m.UserId == userId))).ExecuteDeleteAsync();
        }

        public async Task<List<JointAccountDto>> GetAllJointTableAccountsAsync(int userId)
        {
            return await context.JointAccounts
                .Where(a => a.Members.Any(m => m.UserId == userId))
                .Select(a => new JointAccountDto
                {
                    Id = a.Id,
                    isAdmin = a.Members.Any(x => x.UserId == userId && x.Role == "ADMIN"),
                    Members = a.Members.Count(),
                    Title = a.Title,
                    CreatedBy = userId, // assuming you renamed it
                    CreatedAt = a.CreatedAt,
                    Balance = context.Transections
                        .Where(x => x.AccountId == a.Id && x.AccountType == "JOINT")
                        .Sum(y => y.AmountCents) / 100
                })
                .ToListAsync();
        }

        public async Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<JointAccountDto> GetJointTableAccountByIdAsync(int userId, int accountId, string accountType)
        {
            return await context.JointAccounts
                .Where(a => a.Id == accountId && a.Members.Any(m => m.UserId == userId))
                .Select(a => new JointAccountDto
                {
                    Id = a.Id,
                    isAdmin = a.Members.Any(x => x.UserId == userId && x.Role == "ADMIN"),
                    Members = a.Members.Count(),
                    Title = a.Title,
                    CreatedBy = userId, // assuming you renamed it
                    CreatedAt = a.CreatedAt,
                    Balance = context.Transections
                        .Where(x => x.AccountId == a.Id && x.AccountType == accountType)
                        .Sum(y => y.AmountCents) / 100
                })
                .FirstOrDefaultAsync();
        }

        public async Task<JointAccount> GetJointAccountByIdAsync(int userId, int accountId)
        {
            return await context.JointAccounts
                .Include(a => a.User)
                .Where(a => a.Id == accountId)
                .FirstOrDefaultAsync();
        }

        public async Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId)
        {
            return await context.PersonalAccounts
                .Where(a => a.Id == accountId)
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
