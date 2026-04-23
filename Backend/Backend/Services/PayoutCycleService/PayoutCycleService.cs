using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PayoutCycles;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Mapping;
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
        public async Task<ApiResponse<PayoutCycleDto>> CreatePayoutCycleAsync(int userId, int jointAccountId, int scheduleId)
        {
            ApiResponse<PayoutCycleDto> response = new()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Payout Cycle successfully created",
                Data = null
            };


            PayoutCycles cycle = await cycleRepository.GetPayoutCycleByAccountIdAsync(jointAccountId);
            if (cycle != null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "You can't create a new payoutcycle while one still exist";
                return response;
            }

            JointAccountDto jointAccount = await accountRepository.GetJointTableAccountByIdAsync(userId, jointAccountId, "JOINT");
            if (jointAccount == null) { 
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Joint account not found";
                return response;
            }

            // Check if its an actual member trying to create the payout cycle
            if (!jointAccount.isAdmin)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Only admin can create payout cycles";
                return response;
            }

            ContributionSchedule schedule = await scheduleRepository.GetScheduleByIdAsync(scheduleId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "schedule not found";
                return response;
            }

            PayoutCycles payoutCycle = new PayoutCycles();
            payoutCycle.CycleNumber = 1;
            payoutCycle.TotalMembersAtStart = jointAccount.Members;
            payoutCycle.StartDate = DateOnly.FromDateTime(DateTime.Now);
            payoutCycle.EstimatedTotalAmount = schedule.AmountCents * jointAccount.Members;
            payoutCycle.IsActive = true;

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
            response.Data = payoutCycle.ToDto();
            
            return response;
        }

        public async Task<ApiResponse<List<PayoutCycleDto>>> GetAllPayoutCyclesAsync(int jointAccountId)
        {
            ApiResponse<List<PayoutCycleDto>> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Payout Cycles successfully fetched",
                Data = null
            };

            response.Data = await cycleRepository.GetAllPayoutCyclesAsync(jointAccountId);

            return response;
        }

        public async Task<ApiResponse<PayoutCycleDto>> GetPayoutCycleAsync(int accountId)
        {
            ApiResponse<PayoutCycleDto> response = new()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Payout Cycle successfully fetched",
                Data = null
            };

            PayoutCycles cycle = await cycleRepository.GetPayoutCycleByAccountIdAsync(accountId);

            if (cycle == null)
            {
                response.ResponseCode = ResponseCode.Ok;
                response.Message = "Payout cycle not found";
                return response;
            }

            response.Data = cycle.ToDto();
            return response;
        }
    }
}
