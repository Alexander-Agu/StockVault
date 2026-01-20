using System.Transactions;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;

namespace Backend.Repository.TransectionRepository
{
    public interface ITransectionRepository
    {
        /*
         * TODO: Save database changes
         */
        public Task SaveChangesAsync();


        /*
         * TODO: Adds a new transection to the database
         */
        public Task AddTransectionAsync(Transection transection);


        /*
         * TODO: Feches all account transections
         */
        public Task<List<TransectionDto>> GetAllAccountTransectionsAsync(int userId, int accountId);


        /*
         * TODO: Feches all user transections
         */
        public Task<List<TransectionDto>> GetAllUserTransectionsAsync(int userId);


        /*
         * TODO: Allows user to get the sum of their account balance using transection
         */
        public Task<int> GetAccountBalanceAsync(int userId, int accountId);


        /*
         * TODO: 
         */
    }
}
