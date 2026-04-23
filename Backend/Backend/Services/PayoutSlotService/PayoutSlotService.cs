using Backend.Dtos.AccountDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.JointAccountMembersDtos;
using Backend.Dtos.PayoutSlotDto;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.JointAccountMembersRepository;
using Backend.Repository.JointAccountRepository;
using Backend.Repository.PayoutCycleRepository;
using Backend.Repository.PayoutSlotRepository;
using Backend.Services.PersonalAccountService;
using Backend.Services.TransectionService;
using Stripe.V2;

namespace Backend.Services.PayoutSlotService
{
    public class PayoutSlotService(
        IPayoutSlotRepository slotRepository,
        IPayoutCycleRepository cycleRepository,
        IPersonalAccountService personalAccountService,
        IJointAccountRepository accountRepository,
        ITransectionService transectionService,
        IJointAccountMembersRepository membersRepository
        ) : IPayoutSlotService
    {
        public async Task<ApiResponse<List<PayoutSlotDto>>> CreatePayoutSlotsAsync(int userId, int cycleId)
        {
            var response = new ApiResponse<List<PayoutSlotDto>>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Payout Slots Created",
                Data = null
            };

            // Validate cycle exists
            var cycle = await cycleRepository.GetPayoutCycleByIdAsync(cycleId);
            if (cycle == null)
            {
                response.ResponseCode = ResponseCode.Ok;
                response.Message = "Payout Cycle not found";
                return response;
            }

            // Validate is slots already exist firt the current cycle
            var slotsExist = await slotRepository.GetAllPayoutSlotsAsync(cycleId);
            if (slotsExist != null || slotsExist.Count > 0)
            {
                response.ResponseCode = ResponseCode.Ok;
                response.Message = "Slots already exists";
                return response;
            }


            // Get members
            var members = await membersRepository.GetAllMembersAsync(cycle.JointAccountId);
            if (members?.Any() != true)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "No members found for this payout cycle";
                return response;
            }

            // Validate if user is an ADMIN
            bool isAdmin = members.Where(a => a.UserId == userId)
                .FirstOrDefault().Role.ToLower() == "admin";
            if (!isAdmin)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Only admins can create payout cycles";
                return response;
            }
            
            var slots = Enumerable.Range(1, members.Count)
                .Select(position => new PayoutSlot
                {
                    Position = position,
                    IsPaidOut = false,
                    CycleId = cycle.Id,
                    UserId = userId
                })
                .ToList();

            await slotRepository.AddPayoutSlotsBatchAsync(slots);

            // Convert to DTOs
            response.Data = slots.Select(slot => new PayoutSlotDto
            {
                Id = slot.Id,
                Position = slot.Position,
                IsPaidOut = slot.IsPaidOut,
                PayoutDate = default
            }).ToList();

            return response;
        }

        public async Task<ApiResponse<PayoutSlotDto>> ExecutePayoutSlotAsync(int userId, int cycleId, int slotId)
        {
            var response = new ApiResponse<PayoutSlotDto>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Payout Slot Paid",
                Data = null
            };

            // Validate cycle exists
            PayoutCycles cycle = await cycleRepository.GetPayoutCycleByIdAsync(cycleId);
            if (cycle == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Payout Cycle not found";
                return response;
            }

            // Validate slot exists
            var slot = await slotRepository
                .GetPayoutSlotByPositionAsync(cycleId, cycle.CycleNumber);
            if (slot == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Payout Slot not found";
                return response;
            }

            JointAccountDto account = await accountRepository
                .GetJointTableAccountByIdAsync(userId, cycle.JointAccountId, "JOINT");
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Joint Account not found";
                return response;
            }

            // Validate if user is an ADMIN
            if (!account.isAdmin)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Only admins can execute payout slots";
                return response;
            }

            // Check if slot is already paid
            if (slot.IsPaidOut)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "This slot has already been paid out";
                return response;
            }

            if (account.Balance * 100 >= cycle.EstimatedTotalAmount)
            {
                int payoutAmount = cycle.EstimatedTotalAmount;

                await personalAccountService.InternalDepositAsync(
                    slot.UserId,
                    account.Id,
                    payoutAmount
                );

                // Update records
                slot.IsPaidOut = true;
                account.Balance -= payoutAmount;


                // Log the transaction correctly
                await transectionService.RecordTransectionAsync(userId, CreateTransection(
                    account.Id,
                    -payoutAmount,
                    account.Id,
                    "PAYOUT_EXECUTED"
                ));

                // Close cycle if complete
                if (cycle.CycleNumber + 1 <= cycle.TotalMembersAtStart)
                {
                    cycle.CycleNumber = Math.Min(cycle.CycleNumber + 1, cycle.TotalMembersAtStart);
                } else cycle.IsActive = false;

                await slotRepository.SaveChangesAsync();

                response.Data = slot.ToDto();
                return response;
            }
            else
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = $"Joint account has {account.Balance} but needs {cycle.EstimatedTotalAmount}";
                return response;
            }
        }

        public async Task<ApiResponse<List<PayoutSlotDto>>> GetAllPayoutSlotsAsync(int cycleId)
        {
            var response = new ApiResponse<List<PayoutSlotDto>>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Fetched all payout slots",
                Data = null
            };

            List<PayoutSlotDto> payoutSlots = await slotRepository.GetAllPayoutSlotsAsync(cycleId);

            if (payoutSlots == null) {
                response.ResponseCode = ResponseCode.Ok;
                response.Message = "Failed to fetched all payout slots";
                return response;
            }

            response.Data = payoutSlots;
            return response;
        }



        private CreateTransectionDto CreateTransection(
        int userId,
        int amount,
        int accountId,
        string transectionType
        )
        {
            return new()
            {
                AccountId = accountId,
                AccountType = "JOINT",
                AmountCents = amount,
                TransectionType = transectionType,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };
        }
    }
}
