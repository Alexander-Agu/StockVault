using Backend.Dtos.PayoutSlotDto;
using Backend.Dtos.ResponseDto;
using Backend.Entities;

namespace Backend.Services.PayoutSlotService
{
    public interface IPayoutSlotService
    {
        Task<ApiResponse<List<PayoutSlotDto>>> CreatePayoutSlotsAsync(int userId, int cycleId);

        Task<ApiResponse<List<PayoutSlotDto>>> GetAllPayoutSlotsAsync(int cycleId);

        Task<ApiResponse<PayoutSlotDto>> ExecutePayoutSlotAsync(int userId, int cycleId, int slotId);
    }
}
