using Backend.Dtos.ResponseDto;
using Backend.Entities;

namespace Backend.Services.PayoutSlotService
{
    public interface IPayoutSlotService
    {
        Task<ApiResponse<List<PayoutSlot>>> CreatePayoutSlotsAsync(int userId, int cycleId);

        Task<ApiResponse<List<PayoutSlot>>> GetAllPayoutSlotsAsync(int cycleId);

        Task<ApiResponse<PayoutSlot>> ExecutePayoutSlotAsync(int userId, int cycleId, int slotId);
    }
}
