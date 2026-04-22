using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.PayoutSlotRepository
{
    public class PayoutSlotRepository(
            StockVaultContext context
        ) : IPayoutSlotRepository
    {
        public async Task AddPayoutSlotAsync(PayoutSlot payoutSlot)
        {
            await context.PayoutSlots
                .AddAsync(payoutSlot);

            await SaveChangesAsync();
        }

        public async Task AddPayoutSlotsBatchAsync(List<PayoutSlot> slots)
        {
            await context.PayoutSlots.AddRangeAsync(slots);
            await context.SaveChangesAsync();
        }

        public async Task<List<PayoutSlot>> GetAllPayoutSlotsAsync(int cycleId)
        {
            return await context.PayoutSlots
                .Where(p => p.CycleId == cycleId)
                .ToListAsync();
        }

        public async Task<PayoutSlot> GetPayoutSlotAsync(int cycleId, int slotId)
        {
            return await context.PayoutSlots
                .Where(p => p.CycleId == cycleId && p.Id == slotId)
                .FirstOrDefaultAsync();
        }

        public async Task<PayoutSlot> GetPayoutSlotByIdAsync(int slotId)
        {
            return await context.PayoutSlots.FindAsync(slotId);
        }

        public async Task<PayoutSlot> GetPayoutSlotByPositionAsync(int cycleId, int position)
        {
            return await context.PayoutSlots
                .Where(p => p.CycleId == cycleId && p.Position == position)
                .FirstOrDefaultAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
