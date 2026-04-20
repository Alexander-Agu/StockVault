using Backend.Entities;

namespace Backend.Repository.PayoutCycleRepository
{
    public interface IPayoutCycleRepository
    {
        Task AddPayoutCycleAsync(PayoutCycles payoutCycle);

        Task<List<PayoutCycles>> GetAllPayoutCyclesAsync(int jointAccountId);
    }
}
