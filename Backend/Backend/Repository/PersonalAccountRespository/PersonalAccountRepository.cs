using Backend.Dtos.PersonalAccountDtos;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.PersonalAccountRespository
{
    public class PersonalAccountRepository(StockVaultContext context) : IPersonalAccountRepository
    {
        public async Task AddPersonalAccountAsync(PersonalAccount newAccount)
        {
            await context.PersonalAccounts.AddAsync(newAccount);
        }

        public async Task DeletePersonalAccountByIdAsync(int userId, int accountId)
        {
            await context.PersonalAccounts.Where(p => p.UserId == userId && p.Id == accountId).ExecuteDeleteAsync();
        }

        public async Task<List<PersonalAccountDto>> GetAllJointTableAccountsAsync(int userId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId)
                .Select(a => new PersonalAccountDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Balance = a.Balance / 100,
                    CreatedAt = a.CreatedAt,
                    LockedUntil = a.AccountLock != null? a.AccountLock.LockedUntil : DateOnly.FromDateTime(DateTime.Today),
                    IsActive = a.AccountLock != null ? a.AccountLock.LockedUntil > DateOnly.FromDateTime(DateTime.Today) : false,
                })
                .ToListAsync();
        }

        public async Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId)
                .ToListAsync();
        }

        public async Task<PersonalAccountDto> GetJointTableAccountByIdAsync(int userId, int accountId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId && a.Id == accountId)
                .Select(a => new PersonalAccountDto
                {
                    Id = a.Id,
                    Title = a.Title,
                    Balance = a.Balance / 100,
                    CreatedAt = a.CreatedAt,
                    LockedUntil = a.AccountLock != null ? a.AccountLock.LockedUntil : DateOnly.FromDateTime(DateTime.Today),
                    IsActive = a.AccountLock != null ? a.AccountLock.LockedUntil > DateOnly.FromDateTime(DateTime.Today) : false,
                })
                .FirstOrDefaultAsync();
        }

        public async Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId)
        {
            return await context.PersonalAccounts
                .Where(a => a.UserId == userId && a.Id == accountId)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> PersonalAccountExist(int userId, string title)
        {
            return await context.PersonalAccounts.Where(t => t.Title == title && t.UserId == userId).AnyAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
