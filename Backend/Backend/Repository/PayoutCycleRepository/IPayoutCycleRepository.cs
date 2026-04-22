using Backend.Entities;

namespace Backend.Repository.PayoutCycleRepository
{
    public interface IPayoutCycleRepository
    {
        Task SaveChangesAsync();
        Task AddPayoutCycleAsync(PayoutCycles payoutCycle);

        Task<List<PayoutCycles>> GetAllPayoutCyclesAsync(int jointAccountId);

        Task<PayoutCycles> GetPayoutCycleById(int cycleId);
    }
}
