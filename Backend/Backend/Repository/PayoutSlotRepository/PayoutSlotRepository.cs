using Backend.Entities;
using Backend.Repository.Data;

namespace Backend.Repository.PayoutSlotRepository
{
    public class PayoutSlotRepository(
            StockVaultContext context
        ) : IPayoutSlotRepository
    {
        public Task<PayoutSlot> AddPayoutSlotAsync(PayoutSlot payoutSlot)
        {
            throw new NotImplementedException();
        }

        public Task<List<PayoutSlot>> GetAllPayoutSlotsAsync(int cycleId)
        {
            throw new NotImplementedException();
        }

        public Task<PayoutSlot> GetPayoutSlotAsync(int cycleId, int slotId)
        {
            throw new NotImplementedException();
        }

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
