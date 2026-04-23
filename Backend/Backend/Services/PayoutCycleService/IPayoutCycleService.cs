using Backend.Dtos.PayoutCycles;
using Backend.Dtos.ResponseDto;
using Backend.Entities;

namespace Backend.Services.PayoutCycleService
{
    public interface IPayoutCycleService
    {
        Task<ApiResponse<PayoutCycleDto>> CreatePayoutCycleAsync(int userId, int jointAccountId, int scheduleId);
        Task<ApiResponse<PayoutCycleDto>> GetPayoutCycleAsync(int accountId);
        Task<ApiResponse<List<PayoutCycleDto>>> GetAllPayoutCyclesAsync(int jointAccountId);
    }
}
