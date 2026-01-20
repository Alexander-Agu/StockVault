using System.Transactions;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.TransectionRepository
{
    public class TransectionRepository(StockVaultContext context) : ITransectionRepository
    {
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        // Adds a new transection to the database
        public async Task AddTransectionAsync(Transection transaction)
        {
            await context.Transections.AddAsync(transaction);
            await SaveChangesAsync();
        }

        // Allows user to get the sum of their account balance using transection
        public async Task<int> GetAccountBalanceAsync(int userId, int accountId)
        {
            return await context.Transections
                .Where(t => t.userId == userId && t.AccountId == accountId)
                .SumAsync(t => t.AmountCents);
        }

        // Feches all account transections
        public async Task<List<TransectionDto>> GetAllAccountTransectionsAsync(int userId, int accountId)
        {
            return await context.Transections
                .Where(t => t.userId == userId && t.AccountId == accountId)
                .Select(transection => new TransectionDto {
                    transectionId = transection.Id,
                    AccountId = transection.AccountId,
                    AccountType = transection.AccountType,
                    UserName = transection.User != null? transection.User.FirstName : "",
                    AmountCents = transection.AmountCents / 100,
                    TransectionType =  transection.TransectionType,
                    CreatedAt = transection.CreatedAt  
                })
                .ToListAsync();
        }

        //Feches all user transections
        public async Task<List<TransectionDto>> GetAllUserTransectionsAsync(int userId)
        {
            return await context.Transections
                .Where(t => t.userId == userId)
                .Select(transection => new TransectionDto
                {
                    transectionId = transection.Id,
                    AccountId = transection.AccountId,
                    AccountType = transection.AccountType,
                    UserName = transection.User != null ? transection.User.FirstName : "",
                    AmountCents = transection.AmountCents / 100,
                    TransectionType = transection.TransectionType,
                    CreatedAt = transection.CreatedAt
                })
                .ToListAsync();
        }
    }
}
