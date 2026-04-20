using Backend.Dtos.PayoutCycles;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Repository.ContributionScheduleRepository;
using Backend.Repository.JointAccountRepository;
using Backend.Repository.PayoutCycleRepository;
using Backend.Services.JointAccountService;

namespace Backend.Services.PayoutCycleService
{
    public class PayoutCycleService(
            IPayoutCycleRepository cycleRepository,
            IJointAccountRepository accountRepository,
            IContributionScheduleRepository scheduleRepository,
            IJointAccountService accountService
        ) : IPayoutCycleService
    {
        public async Task<ApiResponse<PayoutCycles>> CreatePayoutCycleAsync(int userId, int jointAccountId, int scheduleId)
        {
            ApiResponse<PayoutCycles> response = new()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Payout Cycle successfully created",
                Data = null
            };

            JointAccount jointAccount = await accountRepository.GetJointAccountByIdAsync(userId, jointAccountId);
            if (jointAccount == null) { 
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Joint account not found";
                return response;
            }

            // Check if its an actual member trying to create the payout cycle
            if (jointAccount.Members.Where(j => j.Id == jointAccountId).FirstOrDefault().Role.ToLower() == "member")
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Only admin can create payout cycles";
                return response;
            }

            PayoutCycles payoutCycle = new PayoutCycles();
            payoutCycle.CycleNumber = 1;
            payoutCycle.TotalMembersAtStart = jointAccount.Members.Count;
            payoutCycle.StartDate = DateOnly.FromDateTime(DateTime.Now);

            ContributionSchedule schedule = await scheduleRepository.GetScheduleByIdAsync(scheduleId);
            if (schedule == null) {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "schedule not found";
                return response;
            }

            if (schedule.Frequency == "weekly")
            {
                payoutCycle.EndDate = payoutCycle.StartDate.AddDays(payoutCycle.TotalMembersAtStart * 7);
            }
            else if (schedule.Frequency == "monthly")
            {
                payoutCycle.EndDate = payoutCycle.StartDate.AddMonths(payoutCycle.TotalMembersAtStart);
            }

            payoutCycle.JointAccountId = jointAccountId;
            payoutCycle.ScheduleId = scheduleId;

            await cycleRepository.AddPayoutCycleAsync(payoutCycle);
            response.Data = payoutCycle;
            
            return response;
        }

        public async Task<ApiResponse<List<PayoutCycles>>> GetAllPayoutCyclesAsync(int jointAccountId)
        {
            ApiResponse<List<PayoutCycles>> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Payout Cycles successfully fetched",
                Data = null
            };

            response.Data = await cycleRepository.GetAllPayoutCyclesAsync(jointAccountId);

            return response;
        }
    }
}
