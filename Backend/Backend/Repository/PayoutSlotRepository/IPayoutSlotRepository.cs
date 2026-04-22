using Backend.Entities;

namespace Backend.Repository.PayoutSlotRepository
{
    public interface IPayoutSlotRepository
    {
        Task SaveChangesAsync();
        Task AddPayoutSlotAsync(PayoutSlot payoutSlot);

        Task AddPayoutSlotsBatchAsync(List<PayoutSlot> slots);

        Task<List<PayoutSlot>> GetAllPayoutSlotsAsync(int cycleId);

        Task<PayoutSlot> GetPayoutSlotAsync(int cycleId, int slotId);
        Task<PayoutSlot> GetPayoutSlotByPositionAsync(int cycleId, int position);
        Task<PayoutSlot> GetPayoutSlotByIdAsync(int slotId);
    }
}
