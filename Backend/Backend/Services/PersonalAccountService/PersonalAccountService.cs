using System.Collections.Generic;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.AccountLocksRepository;
using Backend.Repository.PersonalAccountRespository;
using Backend.Repository.UserRepository;
using Backend.Services.TransectionService;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Services.PersonalAccountService
{
    public class PersonalAccountService( // Dependency Injections
        IPersonalAccountRepository accountRep, 
        IUserRepository userRep, 
        IAccountRepositoryLocks lockRep,
        ITransectionService transectionService) : IPersonalAccountService
    {
        // Allows user's to create a personal account
        public async Task<ApiResponse<PersonalAccountDto>> CreatePersonalAccountAsync(int userId, CreateAccountDto newAccount)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Personal account created",
                Data = null
            };

            // Check if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User not found!";

                return response;
            }



            // Create user to personal relationship
            PersonalAccount account = newAccount.ToEntity();
            account.UserId = userId;

            if (await accountRep.PersonalAccountExist(userId, account.Title))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Please choose a unique name for your account";

                return response;
            }

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
                ResponseCode = ResponseCode.Ok,
                Message = "Amount was successfully deposited",
                Data = null
            };

            // Checks if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }

            account.Balance += ToCents(amount.Amount); // Depositing

            // Save transection
            await transectionService.RecordTransectionAsync(userId, CreateTransection(
                    userId,
                    ToCents(amount.Amount),
                    account,
                    "DEPOSIT"
                ));

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
            ApiResponse<List<PersonalAccountDto>> response = new ApiResponse<List<PersonalAccountDto>>() {
                ResponseCode = ResponseCode.Ok,
                Message = "Accounts fetched",
                Data = null
            };

            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }


            List<PersonalAccountDto>? accounts = await accountRep.GetAllJointTableAccountsAsync(userId);
            response.Data = accounts;
            return response;
        }


        // Allows user to fetch their personal account data
        public async Task<ApiResponse<PersonalAccountDto>> GetPersonalAccount(int userId, int accountId)
        {
            ApiResponse<PersonalAccountDto> response = new ApiResponse<PersonalAccountDto>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Account found",
                Data = null
            };


            // Checks if account exists
            PersonalAccountDto? account = await accountRep.GetJointTableAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
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
                ResponseCode = ResponseCode.Ok,
                Message = "Account locked",
                Data = null
            };

            // Check if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Failed to lock account because account does not exist";

                return response;
            }

            AccountLocks? findAccount = await lockRep.FindAccountLockByAccountId(accountId);
            if (findAccount != null)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Lock already exists";

                return response;
            }

            AccountLocks? accountLocks = accountLock.ToEntity();
            accountLocks.PersonalAccountId = account.Id;

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
                ResponseCode = ResponseCode.Ok,
                Message = "Amount successfully widthdrawed",
                Data = null
            };

            // Checks if account exists
            PersonalAccount account = await accountRep.GetPersonalAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }

            if (account.Balance - ToCents(amount.Amount) >= 0) // only widthdraw if user has enough funs
            {
                account.Balance -= ToCents(amount.Amount); // widthdrawing

                // Save transection
                await transectionService.RecordTransectionAsync(userId, CreateTransection(
                        userId,
                        -ToCents(amount.Amount),
                        account,
                        "WITHDRAWAL"
                    ));

                await accountRep.SaveChangesAsync();
            }
            else
            {
                response.ResponseCode = ResponseCode.BadRequest;
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
        private int ToCents(decimal amount)
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


        /*
         * TODO: Creates a transection DTO
         */
        private CreateTransectionDto CreateTransection(
                int userId,
                int amount,
                PersonalAccount account,
                string transectionType
            )
        {
            return new() { 
                AccountId = account.Id,
                AccountType = "PERSONAL",
                AmountCents = amount,
                TransectionType = transectionType,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };
        }
    }
}
