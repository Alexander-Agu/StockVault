using System.Collections.Generic;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.AccountLocksRepository;
using Backend.Repository.JointAccountRepository;
using Backend.Repository.PersonalAccountRespository;
using Backend.Repository.UserRepository;
using Backend.Services.TransectionService;
using Stripe;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Backend.Services.JointAccountService
{
    public class JointAccountService( // Dependency Injections
        IJointAccountRepository accountRep, 
        IUserRepository userRep, 
        IAccountRepositoryLocks lockRep,
        ITransectionService transectionService,
        PaymentIntentService paymentService) : IJointAccountService
    {
        // Allows user's to create a personal account
        public async Task<ApiResponse<JointAccountDto>> CreateJointAccountAsync(int userId, CreateAccountDto newAccount)
        {
            ApiResponse<JointAccountDto> response = new ApiResponse<JointAccountDto>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Joint account created",
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


            // Create user to joint relationship
            JointAccount account = new JointAccount
            {
                Title = newAccount.Title,
                CreatedAt = DateTime.Now,
                Balance = 0
            };
            account.UserId = userId;

            if (await accountRep.JointAccountExist(userId, account.Title))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Please choose a unique name for your account";

                return response;
            }

            await accountRep.AddJointAccountAsync(account);
            await accountRep.SaveChangesAsync();

            // After saving new acccount return it
            response.Data = await accountRep.GetJointTableAccountByIdAsync(userId, account.Id);

            return response;
        }


        // Allows users to deposit money into their account
        public async Task<ApiResponse<JointAccountDto>> DepositAsync(int userId, int accountId, DepositDto amount)
        {
            ApiResponse<JointAccountDto> response = new ApiResponse<JointAccountDto>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Amount was successfully deposited",
                Data = null
            };

            // Checks if account exists
            JointAccount account = await accountRep.GetJointAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }

            // Simulating stripe transection
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long?)(amount.Amount * 100),
                Currency = "zar",
                Customer = account.User.StripeCustomerId,
                PaymentMethod = amount.PaymentMethodId,
                Confirm = true
            };

            var intent = await paymentService.CreateAsync(options);

            if (intent.Status == "succeeded") account.Balance += ToCents(amount.Amount);

            // Save transection
            await transectionService.RecordTransectionAsync(userId, CreateTransectionForJoint(
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


        // Allows a user to get all of their joint accounts
        public async Task<ApiResponse<List<JointAccountDto>>> GetAllPersonalAccountsAsync(int userId)
        {
            ApiResponse<List<JointAccountDto>> response = new ApiResponse<List<JointAccountDto>>() {
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


            List<JointAccountDto>? accounts = await accountRep.GetAllJointTableAccountsAsync(userId);
            response.Data = accounts;
            return response;
        }


        // Allows user to fetch their joint account data
        public async Task<ApiResponse<JointAccountDto>> GetPersonalAccount(int userId, int accountId)
        {
            ApiResponse<JointAccountDto> response = new ApiResponse<JointAccountDto>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Account found",
                Data = null
            };


            // Checks if account exists
            JointAccountDto? account = await accountRep.GetJointTableAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }
            else response.Data = account;

            return response;
        }

        public async Task<ApiResponse<JointAccountDto>> LockAccountAsync(int userId, int accountId, LockAccountDto accountLock)
        {
            ApiResponse<JointAccountDto> response = new ApiResponse<JointAccountDto>()
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
        public async Task<ApiResponse<JointAccountDto>> WidthdrawAsync(int userId, int accountId, WidthdrawDto amount)
        {
            ApiResponse<JointAccountDto> response = new ApiResponse<JointAccountDto>()
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
         * TODO: Creates a transection DTO for PersonalAccount
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

        /*
         * TODO: Creates a transection DTO for JointAccount
         */
        private CreateTransectionDto CreateTransectionForJoint(
                int userId,
                int amount,
                JointAccount account,
                string transectionType
            )
        {
            return new() {
                AccountId = account.Id,
                AccountType = "JOINT",
                AmountCents = amount,
                TransectionType = transectionType,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };
        }
    }
}
