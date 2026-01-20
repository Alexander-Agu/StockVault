using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.TransectionRepository;
using Backend.Repository.UserRepository;
using Backend.Services.UserService;

namespace Backend.Services.TransectionService
{
    public class TransectionService(
            ITransectionRepository transectionRep,
            IUserRepository userRep
        ) : ITransectionService
    {
        // Returns all transactions for an account.
        public async Task<ApiResponse<List<TransectionDto>>> GetAllAccountTransectionAsync(int userId, int accountId)
        {
            ApiResponse<List<TransectionDto>> response = new()
            {
                Success = true,
                Message = "All available account transections fetched",
                Data = null
            };

            // Checking if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null) {
                response.Success = false;
                response.Message = "User not found";

                return response;
            }

            response.Data = await transectionRep.GetAllAccountTransectionsAsync(userId, accountId);

            return response;
        }

        // Returns the **current balance**, derived from transactions
        public async Task<ApiResponse<AccountBalanceDto>> GetCurrentAmountBalance(int userId, int accountId)
        {
            ApiResponse<AccountBalanceDto> response = new()
            {
                Success = true,
                Message = "Account balance fetched",
                Data = null
            };

            // Checking if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";

                return response;
            }

            AccountBalanceDto accountBalance = new() { 
                AccountId = accountId,
                Balance = await transectionRep.GetAccountBalanceAsync(userId, accountId) / 100
            };

            response.Data = accountBalance;

            return response;
        }

        // Gets all user transections
        public async Task<ApiResponse<List<TransectionDto>>> GetAllUserTransectionsAsync(int userId)
        {
            ApiResponse<List<TransectionDto>> response = new()
            {
                Success = true,
                Message = "All available user transections fetched",
                Data = null
            };

            // Checking if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";

                return response;
            }

            response.Data = await transectionRep.GetAllUserTransectionsAsync(userId);

            return response;
        }

        // Allows transections to be recorded
        public async Task<ApiResponse<TransectionDto>> RecordTransectionAsync(int userId, CreateTransectionDto transection)
        {
            ApiResponse<TransectionDto> response = new() {
                Success = true,
                Message = "Transection saved",
                Data = null
            };

            // Checking if user exists
            User? user = await userRep.GetUserByIdAsync(userId);
            if (user == null)
            {
                response.Success = false;
                response.Message = "User not found";

                return response;
            }

            Transection newTransection = transection.ToEntity();
            newTransection.userId = userId;

            await transectionRep.AddTransectionAsync(newTransection);

            response.Data = newTransection.ToDto();

            return response;
        }
    }
}
