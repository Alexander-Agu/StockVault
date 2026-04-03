using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Entities;

namespace Backend.Repository.JointAccountRepository
{
    public interface IJointAccountRepository
    {
        /*
         * TODO: Save database changes
         */
        public Task SaveChangesAsync();


        /*
         * TODO: New joint account will be saved to the database
         */
        public Task AddJointAccountAsync(JointAccount newAccount);


        /*
         * TODO: Fetches all personal account
         */
        public Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId);


        /*
         * TODO: Fetches all joint accounts
         */
        public Task<List<JointAccountDto>> GetAllJointTableAccountsAsync(int userId);


        /*
         * TODO: Fetches a personal account by userId and personalId
         */
        public Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Fetches a joint account by userId and accountId
         */
        public Task<JointAccountDto> GetJointTableAccountByIdAsync(int userId, int accountId, string accountType);


        /*
         * TODO: Fetches a joint account entity by userId and accountId
         */
        public Task<JointAccount> GetJointAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Allows a user to delete a joint account
         */
        public Task DeleteJointAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Allows user to check if joint account exists
         */
        public Task<bool> JointAccountExist(int userId, string title);
    }
}
