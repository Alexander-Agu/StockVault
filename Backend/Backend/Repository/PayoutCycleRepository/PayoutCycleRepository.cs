using Backend.Dtos.PayoutCycles;
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

        public async Task<List<PayoutCycleDto>> GetAllPayoutCyclesAsync(int jointAccountId)
        {
            var payoutCycles = await context.PayoutCycles
                .Where(p => p.JointAccountId == jointAccountId)
                .OrderByDescending(p => p.CycleNumber)
                .Select(p => new PayoutCycleDto
                {
                    Id = p.Id,
                    CycleNumber = p.CycleNumber,
                    TotalMembersAtStart = p.TotalMembersAtStart,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    JointAccountId = p.JointAccountId,
                    ScheduleId = p.ScheduleId,
                    EstimatedTotalAmount = p.EstimatedTotalAmount,
                    IsActive = p.IsActive
                })
                .ToListAsync();

            return payoutCycles;
        }

        public async Task<PayoutCycles> GetPayoutCycleByIdAsync(int cycleId)
        {
            return await context.PayoutCycles
                .Where(c => c.IsActive && c.Id == cycleId)
                .FirstOrDefaultAsync();
        }

        public async Task<PayoutCycles> GetPayoutCycleByAccountIdAsync(int accountId)
        {
            return await context.PayoutCycles
                .Where(c => c.IsActive && c.JointAccountId == accountId)
                .FirstOrDefaultAsync();
        }
    }
}
