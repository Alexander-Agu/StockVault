using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Repository.PayoutCycleRepository;

namespace Backend.Services.PayoutCycleService
{
    public class PayoutCycleService(
            IPayoutCycleRepository cycleRepository
        ) : IPayoutCycleService
    {
        public Task<ApiResponse<PayoutCycles>> CreatePayoutCycleAsync()
        {
            throw new NotImplementedException();
        }

        public Task<ApiResponse<List<PayoutCycles>>> GetAllPayoutCycles(int jointAccountId)
        {
            throw new NotImplementedException();
        }
    }
}
