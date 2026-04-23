using Backend.Dtos.PayoutCycles;
using Backend.Entities;

namespace Backend.Repository.PayoutCycleRepository
{
    public interface IPayoutCycleRepository
    {
        Task SaveChangesAsync();
        Task AddPayoutCycleAsync(PayoutCycles payoutCycle);

        Task<List<PayoutCycleDto>> GetAllPayoutCyclesAsync(int jointAccountId);

        Task<PayoutCycles> GetPayoutCycleByAccountIdAsync(int accountId);
        Task<PayoutCycles> GetPayoutCycleByIdAsync(int accountId);
    }
}
