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
        public Task<AccountLocks> GetAccountLockById(int userId, int accountId, int lockId);
    }
}
