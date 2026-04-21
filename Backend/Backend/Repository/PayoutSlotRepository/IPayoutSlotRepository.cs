using Backend.Entities;

namespace Backend.Repository.PayoutSlotRepository
{
    public interface IPayoutSlotRepository
    {
        Task SaveChangesAsync();
        Task<PayoutSlot> AddPayoutSlotAsync(PayoutSlot payoutSlot);

        Task<List<PayoutSlot>> GetAllPayoutSlotsAsync(int cycleId);

        Task<PayoutSlot> GetPayoutSlotAsync(int cycleId, int slotId);
    }
}
