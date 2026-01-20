using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;

namespace Backend.Services.TransectionService
{
    public interface ITransectionService
    {
        /*
         * TODO: Allows transections to be recorded
         * 
         * Behaviour:
         *  Validates account ownership
         *  Writes immutable transaction record
         *  No balance mutation without this call
         * 
         * Transection Types:
         *  Deposit
         *  Widthdraw
         *  Payout
         *  Contribution
         */
        public Task<ApiResponse<TransectionDto>> RecordTransectionAsync(int userId, CreateTransectionDto transection);


        /*
         * TODO: Returns all transactions for an account.
         */
        public Task<ApiResponse<List<TransectionDto>>> GetAllAccountTransectionAsync(int userId, int accountId);


        /*
         * TODO: Gets all user transections
         */
        public Task<ApiResponse<List<TransectionDto>>> GetAllUserTransectionsAsync(int userId);


        /*
         * TODO: Returns the **current balance**, derived from transactions.
         * 
         * - Sums all `amount_cents` for the account
         * - Returns a single authoritative balance
         */
        public Task<ApiResponse<AccountBalanceDto>> GetCurrentAmountBalance(int userId, int accountId);
    }
}
