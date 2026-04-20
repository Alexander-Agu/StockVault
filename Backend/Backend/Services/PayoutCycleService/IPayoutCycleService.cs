using Backend.Dtos.PayoutCycles;
using Backend.Dtos.ResponseDto;
using Backend.Entities;

namespace Backend.Services.PayoutCycleService
{
    public interface IPayoutCycleService
    {
        Task<ApiResponse<PayoutCycles>> CreatePayoutCycleAsync(int userId, int jointAccountId, int scheduleId);

        Task<ApiResponse<List<PayoutCycles>>> GetAllPayoutCyclesAsync(int jointAccountId);
    }
}
