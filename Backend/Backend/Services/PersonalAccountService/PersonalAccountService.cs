using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.AccountLocksRepository;
using Backend.Repository.PersonalAccountRespository;
using Backend.Repository.UserRepository;

namespace Backend.Services.PersonalAccountService
{
    public class PersonalAccountService( // Dependency Injections
        IPersonalAccountRepository accountRep, 
        IUserRepository userRep, 
        IAccountRepositoryLocks lockRep) : IPersonalAccountService
    {
        // Allows user's to create a personal account
        public async Task<Dictionary<string, object>> CreatePersonalAccountAsync(int userId, CreateAccountDto newAccount)
        {
            // Check if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null) return Response("Error", "User not found");

            // Create user to personal relationship
            PersonalAccount account = newAccount.ToEntity();
            account.UserId = userId;

            await accountRep.AddPersonalAccountAsync(account);
            await accountRep.SaveChangesAsync();

            return Response("Success", account);
        }


        // Allows users to deposit money into their account
        public async Task<Dictionary<string, object>> DepositAsync(int userId, int accountId, DepositDto amount)
        {
            // Check if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null) return Response("Error", "User not found");

            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            account.Balance += ToCents(amount.Amount); // Depositing
            await accountRep.SaveChangesAsync();

            return Response("Success", account);
        }

        public async Task<Dictionary<string, object>> GetAccountLockAsync(int userId, int accountId, int lockId)
        {
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null) return Response("Error", "Account not found.");

            AccountLocks? accountLock = await lockRep.GetAccountLockById(accountId, lockId);
            if (accountLock == null) return Response("Error", "Account Lock not found.");

            return Response("Success", accountLock);
        }

        public Task<List<Dictionary<string, object>>> GetAllPersonalAccountsAsync(int userId)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<string, object>> GetPersonalAccount(int userId, int accountId)
        {
            throw new NotImplementedException();
        }

        public Task<Dictionary<string, object>> LockAccountAsync(int userId, int accountId, LockAccountDto accountLock)
        {
            throw new NotImplementedException();
        }


        // Allows user to widthdraw money from their account
        public async Task<Dictionary<string, object>> WidthdrawAsync(int userId, int accountId, WidthdrawDto amount)
        {
            // Check if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null) return Response("Error", "User not found");

            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);

            if (account.Balance - ToCents(amount.Amount) >= 0) // only widthdraw if user has enough funs
            {
                account.Balance += ToCents(amount.Amount); // widthdrawing
                await accountRep.SaveChangesAsync();
            }
            else
            {
                return Response("Error", "Not enough funds");
            }


            return Response("Success", account);
        }


        // ----- HELPER METHODS ----- //


        /*
         * Creates a response message and returns it
        */
        private Dictionary<string, object> Response(string result, object message)
        {
            Dictionary<string, object> response = new Dictionary<string, object>();

            response.Add("result", result);
            response.Add("message", message);
            return response;
        }


        /*
         * TODO: Converts float/rands to cents
         */
        private int ToCents(float amount)
        {
            return (int)Math.Round(amount * 100);
        }


        /*
         * TODO: Converts cents to floats/rands
         */
        private float ToRands(int amount)
        {
            return amount / 100f;
        }
    }
}
