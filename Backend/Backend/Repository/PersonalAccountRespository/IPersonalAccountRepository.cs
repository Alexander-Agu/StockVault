using Backend.Dtos.PersonalAccountDtos;
using Backend.Entities;

namespace Backend.Repository.PersonalAccountRespository
{
    public interface IPersonalAccountRepository
    {
        /*
         * TODO: Save database changes
         */
        public Task SaveChangesAsync();
          

        /*
         * TODO: New personal account will be saved to the database
         */
        public Task AddPersonalAccountAsync(PersonalAccount newAccount);  


        /*
         * TODO: Fetches all personal account
         */
        public Task<List<PersonalAccount>> GetAllPersonalAccountsAsync(int userId);


        /*
         * TODO: Fetches all personal account
         */
        public Task<List<PersonalAccountDto>> GetAllJointTableAccountsAsync(int userId);


        /*
         * TODO: Fetches a personal account by userId and personalId
         */
        public Task<PersonalAccount> GetPersonalAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Fetches a personal account by userId and personalId
         */
        public Task<PersonalAccountDto> GetJointTableAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Allows a user to delete a personal account
         */
        public Task DeletePersonalAccountByIdAsync(int userId, int accountId);


        /*
         * TODO: Allows user to get account by Id
         */
        public Task<bool> PersonalAccountExist(int userId, string title);
    }
}
