using Backend.Dtos.AccountDtos;
using Backend.Dtos.Contributions;
using Backend.Dtos.ContributionScheduleDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.JointAccountMembersDtos;
using Backend.Dtos.PayoutSlotDto;
using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Entities;
using Backend.Mapping;
using Backend.Repository.ContributionRespository;
using Backend.Repository.ContributionScheduleRepository;
using Backend.Repository.JointAccountMembersRepository;
using Backend.Repository.JointAccountRepository;
using Backend.Repository.PersonalAccountRespository;
using Backend.Services.TransectionService;
using Org.BouncyCastle.Asn1.Cms;
using Stripe;
using Stripe.V2;

namespace Backend.Services.ContributionService
{
    public class ContributionService(
            IContributionRepository contributionRep,
            IJointAccountMembersRepository membersRep,
            IJointAccountRepository jointAccountRep,
            ITransectionService transectionService,
            IContributionScheduleRepository scheduleRep,
            IPersonalAccountRepository personalAccountRep,
            PaymentIntentService paymentService
        ) : IContributionService
    {
        public async Task<ApiResponse<List<ContributionDtos>>> CreateContributionsAsync(int userId, int accountId, int slotId)
        {
            var response = new ApiResponse<List<ContributionDtos>>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Contributions Created",
                Data = []
            };

            JointAccount account = await jointAccountRep.GetJointAccountByIdAsync(userId, accountId);
            if (account == null) {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Joint Account not found";
                return response;
            }

            List<MemberDto> members = await membersRep.GetAllMembersAsync(accountId);
            if (members == null || members.Count <= 0)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Joint Account members not found";
                return response;
            }

            List<Contribution> newContributions = new List<Contribution>();
            foreach (MemberDto member in members) {
                Contribution contribution = new()
                {
                    UserId = userId,
                    SlotId = slotId,
                    CreatedAt = DateOnly.FromDateTime(DateTime.UtcNow),
                    Status = "PENDING",
                    AmountCents = 0,
                };
            }

            await contributionRep.AddBatchContributionAsync(newContributions);

            response.Data = newContributions.Select(x => new ContributionDtos { 
                Id = x.Id,
                SlotId = x.SlotId,
                UserId = x.UserId,
                Status = x.Status,
                AmountCents = x.AmountCents,
                CreatedAt = x.CreatedAt,
                PaidAt = x.PaidAt
            }).ToList();

            return response;
        }

        public async Task<ApiResponse<ContributionDtos>> ExecuteContributionIntoJointAccountAsync(int userId, int accountId, int slotId, int contributionId, DepositDto deposit)
        {
            ApiResponse<ContributionDtos> response = new ApiResponse<ContributionDtos>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Amount was successfully deposited",
                Data = null
            };

            // Checks if account exists
            JointAccount? account = await jointAccountRep.GetJointAccountByIdAsync(userId, accountId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }

            ScheduleDto? schedule = await scheduleRep.GetActiveScheduleAsync(accountId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Schedule not found";

                return response;
            }   

            Contribution contribution = await contributionRep.GetContributionById(contributionId);
            if (contribution == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Contribution not found";

                return response;
            }

            // Ensure contribution is the right amount
            if (deposit.Amount * 100 + contribution.AmountCents < (decimal)schedule.Amount * 100) {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Not enough money to execute payment";

                return response;
            }

            // Simulating stripe transection
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long?)(deposit.Amount * 100),
                Currency = "zar",
                Customer = account.User.StripeCustomerId,
                PaymentMethod = deposit.PaymentMethodId,
                Confirm = true,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                    AllowRedirects = "never"
                }
            };

            var intent = await paymentService.CreateAsync(options);

            if (intent.Status == "succeeded")
            {
                account.Balance += ToCents(deposit.Amount);

                // Save transection only if payment succeeded
                await transectionService.RecordTransectionAsync(userId, CreateTransectionForJoint(
                        userId,
                        ToCents(deposit.Amount),
                        account,
                        "DEPOSIT"
                    ));

                contribution.AmountCents += (int) deposit.Amount * 100;
                contribution.Status = "PAID";
                contribution.PaidAt = DateOnly.FromDateTime(DateTime.UtcNow);
            }
            else
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Payment failed";
                return response;
            }

            await contributionRep.SaveChangesAsync();

            response.Data = contribution.ToDto();

            return response;
        }

        public async Task<ApiResponse<ContributionDtos>> ExecuteContributionIntoPersonalAccount(int userId, int accountId, int slotId, int contributionId, DepositDto deposit)
        {
            ApiResponse<ContributionDtos> response = new ApiResponse<ContributionDtos>()
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Amount was successfully deposited",
                Data = null
            };

            // Checks if account exists
            PersonalAccount? account = await personalAccountRep.GetSavingsAccountByUserIdAsync(userId);
            if (account == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Account not found";

                return response;
            }

            ScheduleDto? schedule = await scheduleRep.GetActiveScheduleAsync(accountId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Schedule not found";

                return response;
            }

            Contribution contribution = await contributionRep.GetContributionById(contributionId);
            if (contribution == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Contribution not found";

                return response;
            }

            // Ensure contribution is the right amount
            if (deposit.Amount * 100 + contribution.AmountCents < (decimal)schedule.Amount * 100)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Not enough money to execute payment";

                return response;
            }

            // Simulating stripe transection
            var options = new PaymentIntentCreateOptions
            {
                Amount = (long?)(deposit.Amount * 100),
                Currency = "zar",
                Customer = account.User.StripeCustomerId,
                PaymentMethod = deposit.PaymentMethodId,
                Confirm = true,
                AutomaticPaymentMethods = new PaymentIntentAutomaticPaymentMethodsOptions
                {
                    Enabled = true,
                    AllowRedirects = "never"
                }
            };

            var intent = await paymentService.CreateAsync(options);

            if (intent.Status == "succeeded")
            {
                account.Balance += ToCents(deposit.Amount);

                // Save transection only if payment succeeded
                await transectionService.RecordTransectionAsync(userId, CreateTransection(
                        userId,
                        ToCents(deposit.Amount),
                        account,
                        "DEPOSIT"
                    ));

                contribution.AmountCents += (int)deposit.Amount * 100;
                contribution.Status = "LATE";
                contribution.PaidAt = DateOnly.FromDateTime(DateTime.UtcNow);
            }
            else
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Payment failed";
                return response;
            }

            await contributionRep.SaveChangesAsync();

            response.Data = contribution.ToDto();

            return response;
        }

        public async Task<ApiResponse<List<ContributionDtos>>> GetAllContributionsAsync(int slotId)
        {
            var response = new ApiResponse<List<ContributionDtos>>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Contributions Created",
                Data = []
            };

            List<ContributionDtos> contributions = await contributionRep.GetAllContributionBySlotId(slotId);

            if (contributions == null || contributions.Count <= 0)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Contributions not found";
                return response;
            }

            response.Data = contributions;
            return response;
        }

        public async Task<ApiResponse<ContributionDtos>> GetContributionAsync(int slotId, int contributionId)
        {
            var response = new ApiResponse<ContributionDtos>()
            {
                ResponseCode = ResponseCode.Created,
                Message = "Contributions Created",
                Data = null
            };

            ContributionDtos contributions = await contributionRep.GetContributionBySlotIdAndId(slotId, contributionId);

            if (contributions == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Contribution not found";
                return response;
            }

            response.Data = contributions;
            return response;
        }

        /*
 * TODO: Converts float/rands to cents
 */
        private int ToCents(decimal amount)
        {
            return (int)Math.Round(amount * 100);
        }


        /*
         * TODO: Converts cents to floats/rands
         */
        private float ToRands(int amount)
        {
            return amount / 100f;
        }


        /*
         * TODO: Creates a transection DTO for PersonalAccount
         */
        private CreateTransectionDto CreateTransection(
                int userId,
                int amount,
                PersonalAccount account,
                string transectionType
            )
        {
            return new()
            {
                AccountId = account.Id,
                AccountType = "PERSONAL",
                AmountCents = amount,
                TransectionType = transectionType,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };
        }

        /*
         * TODO: Creates a transection DTO for JointAccount
         */
        private CreateTransectionDto CreateTransectionForJoint(
                int userId,
                int amount,
                JointAccount account,
                string transectionType
            )
        {
            return new()
            {
                AccountId = account.Id,
                AccountType = "JOINT",
                AmountCents = amount,
                TransectionType = transectionType,
                CreatedAt = DateOnly.FromDateTime(DateTime.Now)
            };
        }
    }
}
