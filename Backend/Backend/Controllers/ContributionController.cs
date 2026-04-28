using System.Security.Claims;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.Contributions;
using Backend.Dtos.ResponseDto;
using Backend.Services.ContributionService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContributionController(IContributionService service) : ControllerBase
    {
        [HttpPost("{accountId}/{slotId}")]
        public async Task<ActionResult> CreateContributions(int accountId, int slotId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<ContributionDtos>>? response = await service.CreateContributionsAsync(userId, accountId, slotId);

            return HandleResponse(response);
        }

        [HttpPut("joint/{accountId}/{slotId}/{contributionId}")]
        public async Task<ActionResult> ExecuteContributionIntoJointAccount(int accountId, int slotId, int contributionId,[FromBody] DepositDto deposit)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<ContributionDtos>? response = await service
                .ExecuteContributionIntoJointAccountAsync(userId, accountId, slotId, contributionId, deposit);

            return HandleResponse(response);
        }


        [HttpPut("personal/{accountId}/{slotId}/{contributionId}")]
        public async Task<ActionResult> ExecuteContributionIntoPersonalAccount(int accountId, int slotId, int contributionId, [FromBody] DepositDto deposit)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<ContributionDtos>? response = await service
                .ExecuteContributionIntoPersonalAccountAsync(userId, accountId, slotId, contributionId, deposit);

            return HandleResponse(response);
        }

        [HttpGet("all/{slotId}")]
        public async Task<ActionResult> GetAllPayoutCycles(int slotId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<ContributionDtos>>? response = await service.GetAllContributionsAsync(slotId);

            return HandleResponse(response);
        }

        [HttpGet("{slotId}/{contributionId}")]
        public async Task<ActionResult> GetPayoutCycles(int slotId, int contributionId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<ContributionDtos>? response = await service.GetContributionAsync(slotId, contributionId);

            return HandleResponse(response);
        }

        private int GetUserIdFromClaims()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out int userId))
            {
                throw new UnauthorizedAccessException("User ID not found in token");
            }
            return userId;
        }

        protected ActionResult HandleResponse<T>(ApiResponse<T> response)
        {
            return response.ResponseCode switch
            {
                ResponseCode.Ok => Ok(response),
                ResponseCode.Created => StatusCode(StatusCodes.Status201Created, response),
                ResponseCode.BadRequest => BadRequest(response),
                ResponseCode.NotFound => NotFound(response),
                ResponseCode.Unauthorized => Unauthorized(),
                ResponseCode.Forbidden => Forbid(),
                ResponseCode.ServerError => StatusCode(StatusCodes.Status500InternalServerError, response),
                _ => BadRequest(response)
            };
        }
    }
}
