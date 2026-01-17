using System.Collections.Generic;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
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
        public async Task<ApiResponse<PersonalAccountDto>> CreatePersonalAccountAsync(int userId, CreateAccountDto newAccount)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                Success = true,
                Message = "Personal account created",
                Data = null
            };

            // Check if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found!";

                return response;
            }

            // Create user to personal relationship
            PersonalAccount account = newAccount.ToEntity();
            account.UserId = userId;

            await accountRep.AddPersonalAccountAsync(account);
            await accountRep.SaveChangesAsync();

            // After saving new acccount return it
            response.Data = await accountRep.GetJointTableAccountByIdAsync(userId, account.Id);

            return response;
        }


        // Allows users to deposit money into their account
        public async Task<ApiResponse<PersonalAccountDto>> DepositAsync(int userId, int accountId, DepositDto amount)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                Success = true,
                Message = "Amount was successfully deposited",
                Data = null
            };

            // Checks if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.Success = false;
                response.Message = "Account not found";

                return response;
            }

            account.Balance += ToCents(amount.Amount); // Depositing
            await accountRep.SaveChangesAsync();

            response.Data = await accountRep.GetJointTableAccountByIdAsync(userId, account.Id);

            return response;
        }


        // Allows a user to get their account lock details 
        //public async Task<Dictionary<string, object>> GetAccountLockAsync(int userId, int accountId, int lockId)
        //{
        //    // Checks if account lock exists
        //    AccountLocks? accountLock = await lockRep.GetAccountLockById(accountId, lockId);
        //    if (accountLock == null) return Response("Error", "Account Lock not found.");

        //    return Response("Success", accountLock);
        //}


        // Allows a user to get all of their personal accounts
        public async Task<ApiResponse<List<PersonalAccountDto>>> GetAllPersonalAccountsAsync(int userId)
        {
            List<PersonalAccountDto>? accounts = await accountRep.GetAllJointTableAccountsAsync(userId);
            return new ApiResponse<List<PersonalAccountDto>>
            {
                Success = true,
                Message = "Accounts fetched",
                Data = accounts
            };
        }


        // Allows user to fetch their personal account data
        public async Task<ApiResponse<PersonalAccountDto>> GetPersonalAccount(int userId, int accountId)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                Success = true,
                Message = "Account found",
                Data = null
            };


            // Checks if account exists
            PersonalAccountDto? account = await accountRep.GetJointTableAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.Success = false;
                response.Message = "Account not found";

                return response;
            }
            else response.Data = account;

            return response;
        }

        public async Task<ApiResponse<PersonalAccountDto>> LockAccountAsync(int userId, int accountId, LockAccountDto accountLock)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                Success = true,
                Message = "Account locked",
                Data = null
            };

            // Check if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.Success = false;
                response.Message = "Failed to lock account";

                return response;
            }

            AccountLocks? accountLocks = accountLock.ToEntity();
            accountLocks.PersonalAccountId = accountId;

            await lockRep.AddAccountLockAsync(accountLocks);
            await lockRep.SaveChangesAsync();

            response.Data = await accountRep.GetJointTableAccountByIdAsync(userId, account.Id);

            return response;
        }


        // Allows user to widthdraw money from their account
        public async Task<ApiResponse<PersonalAccountDto>> WidthdrawAsync(int userId, int accountId, WidthdrawDto amount)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                Success = true,
                Message = "Amount successfully widthdrawed",
                Data = null
            };

            // Checks if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.Success = false;
                response.Message = "Account not found";

                return response;
            }

            if (account.Balance - ToCents(amount.Amount) >= 0) // only widthdraw if user has enough funs
            {
                account.Balance += ToCents(amount.Amount); // widthdrawing
                await accountRep.SaveChangesAsync();
            }
            else
            {
                response.Success = false;
                response.Message = "Not enough funds";

                return response;
            }
            
            response.Data = await accountRep.GetJointTableAccountByIdAsync(userId, account.Id);

            return response;
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
