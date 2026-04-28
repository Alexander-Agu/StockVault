using Backend.Dtos.AccountDtos;
using Backend.Dtos.Contributions;
using Backend.Dtos.ResponseDto;

namespace Backend.Services.ContributionService
{
    public interface IContributionService
    {
        Task<ApiResponse<List<ContributionDtos>>> CreateContributionsAsync(int userId, int accountId, int slotId);
        Task<ApiResponse<ContributionDtos>> ExecuteContributionIntoJointAccountAsync(int userId, int accountId, int slotId, int contributionId, DepositDto deposit);
        Task<ApiResponse<ContributionDtos>> ExecuteContributionIntoPersonalAccountAsync(int userId, int accountId, int slotId, int contributionId, DepositDto deposit);
        Task<ApiResponse<List<ContributionDtos>>> GetAllContributionsAsync(int slotId);
        Task<ApiResponse<ContributionDtos>> GetContributionAsync(int slotId, int contributionId);
    }
}
