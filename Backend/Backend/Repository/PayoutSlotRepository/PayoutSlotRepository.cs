using Backend.Dtos.PayoutSlotDto;
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

        public async Task<List<PayoutSlotDto>> GetAllPayoutSlotsAsync(int cycleId)
        {
            var payoutSlots = await context.PayoutSlots
                  .Where(p => p.CycleId == cycleId)
                  .OrderBy(p => p.Position)
                  .Select(p => new PayoutSlotDto
                  {
                      Id = p.Id,
                      Position = p.Position,
                      IsPaidOut = p.IsPaidOut,
                      PayoutDate = p.PayoutDate,
                      CycleId = cycleId,
                      UserId = p.UserId,
                  })
                  .ToListAsync();

            return payoutSlots;
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
