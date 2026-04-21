using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Repository.PayoutCycleRepository;
using Backend.Repository.PayoutSlotRepository;

namespace Backend.Services.PayoutSlotService
{
    public class PayoutSlotService(
        IPayoutSlotRepository slotRepository,
        IPayoutCycleRepository cycleRepository
        ) : IPayoutSlotService
    {
        public Task<ApiResponse<List<PayoutSlot>>> CreatePayoutSlotsAsync(int userId, int cycleId)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<PayoutSlot>> ExecutePayoutSlotAsync(int cycleId, int slotId)
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<List<PayoutSlot>>> GetAllPayoutSlotsAsync(int cycleId)
        {
            throw new NotImplementedException();
        }
    }
}
