using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.PayoutCycleRepository
{
    public class PayoutCycleRepository(StockVaultContext context) : IPayoutCycleRepository
    {
        public async Task SaveChangesAsync()
        {
             await context.SaveChangesAsync();
        }


        public async Task AddPayoutCycleAsync(PayoutCycles payoutCycle)
        {
            await context.PayoutCycles.AddAsync(payoutCycle);
            await SaveChangesAsync();
        }

        public async Task<List<PayoutCycles>> GetAllPayoutCyclesAsync(int jointAccountId)
        {
            return await context.PayoutCycles.Where( p => p.JointAccountId == jointAccountId)
                .ToListAsync();
        }

        public async Task<PayoutCycles> GetPayoutCycleById(int cycleId)
        {
            return await context.PayoutCycles.FindAsync(cycleId);
        }
    }
}
