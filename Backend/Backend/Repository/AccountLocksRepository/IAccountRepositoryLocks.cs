using Backend.Entities;

namespace Backend.Repository.AccountLocksRepository
{
    public interface IAccountRepositoryLocks
    {
        /*
         * TODO: Save database changes
         */
        public Task SaveChangesAsync();


        /*
         * TODO: Adds a new account lock to the database
         */
        public Task AddAccountLockAsync(AccountLocks accountLock);


        /*
         * TODO: Fetches an account lock by using the userId, personalId and accountId
         */
        public Task<AccountLocks> GetAccountLockById(int accountId, int lockId);


        /*
         * TODO: Fetches an account lock by using its title
         */
        public Task<AccountLocks> FindAccountLockByAccountId(int accountId);
    }
}
