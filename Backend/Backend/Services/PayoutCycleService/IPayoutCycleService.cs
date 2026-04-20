using Backend.Dtos.ResponseDto;
using Backend.Entities;

namespace Backend.Services.PayoutCycleService
{
    public interface IPayoutCycleService
    {
        Task<ApiResponse<PayoutCycles>> CreatePayoutCycleAsync();

        Task<ApiResponse<List<PayoutCycles>>> GetAllPayoutCycles(int jointAccountId);
    }
}
