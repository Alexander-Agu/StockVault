using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;

namespace Backend.Services.PersonalAccountService
{
    public interface IPersonalAccountService
    {
        /*
         * TODO: Allows users to create a personal account
         * 
         * Constraints:
         *  * User must exists and be aunthorized
         *  * Balance must start at Zero
         */
        public Task<ApiResponse<PersonalAccountDto>> CreatePersonalAccountAsync(int userId, CreateAccountDto newAccount);
        

        /*
         * TODO: Allows a user to get all their personal account
         */
        public Task<ApiResponse<List<PersonalAccountDto>>> GetAllPersonalAccountsAsync(int userId);


        /*
         * TODO: Allows a user to get one of their accounts
         */
        public Task<ApiResponse<PersonalAccountDto>> GetPersonalAccount(int userId, int accountId);


        /*
         * TODO: Allows user to deposit funds into their account
         * 
         * Condition
         *  1. Money must be converted to sends before being saved to the database
         */
        public Task<ApiResponse<PersonalAccountDto>> DepositAsync(int userId, int accountId, DepositDto amount);


        /*
         * TODO: Allows user's to widthdraw funds from their account
         * 
         * Conditions:
         * 1. Account must not be locked
         * 2. Money must be converted back to cents before updating the database
         * 3. Fails if user does not have enough funds
         */
        public Task<ApiResponse<PersonalAccountDto>> WidthdrawAsync(int userId, int accountId, WidthdrawDto amount);


        /*
         * TODO: Allows user's to set lock rules for their account
         * 
         * Conditions:
         * 1. Cannot shorten or extend an existing lock
         * 2. Lock autometically expires
         */
        public Task<ApiResponse<PersonalAccountDto>> LockAccountAsync(int userId, int accountId, LockAccountDto accountLock);


        /*
         * TODO: Allows user to get their lock account details
         */
        //public Task<Dictionary<string, object>> GetAccountLockAsync(int userId, int accountId, int lockId);
    }
}
