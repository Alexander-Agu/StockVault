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

        public Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public async Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId)
        {
            return await context.PersonalAccounts.Where(p => p.UserId == userId && p.Id == accountId).FirstOrDefaultAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
