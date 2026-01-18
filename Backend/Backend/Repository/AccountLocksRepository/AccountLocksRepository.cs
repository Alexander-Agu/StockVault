using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.AccountLocksRepository
{
    public class AccountLocksRepository(StockVaultContext context) : IAccountRepositoryLocks
    {
        public async Task AddAccountLockAsync(AccountLocks accountLock)
        {
            await context.AccountLocks.AddAsync(accountLock);
        }

        public async Task<AccountLocks> FindAccountLockByAccountId(int accountId)
        {
            return await context.AccountLocks.Where(a => a.PersonalAccountId == accountId).FirstOrDefaultAsync();
        }

        public async Task<AccountLocks> GetAccountLockById(int accountId, int lockId)
        {
            return await context.AccountLocks
                .Where(a => a.PersonalAccountId == accountId && a.Id == lockId)
                .FirstOrDefaultAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
