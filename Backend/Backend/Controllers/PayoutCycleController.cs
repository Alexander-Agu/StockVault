using System.Security.Claims;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Services.PayoutCycleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PayoutCycleController(IPayoutCycleService cycleService) : ControllerBase
    {
        // Allows members's to create a payout cycle
        [HttpPost("{jointAccountId}/{scheduleId}")]
        public async Task<ActionResult> CreatePayoutCycle(int jointAccountId, int scheduleId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<PayoutCycles>? response = await cycleService.CreatePayoutCycleAsync(userId, jointAccountId, scheduleId);

            return HandleResponse(response);
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult> GetJointAccountAsync(int accountId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<PayoutCycles>>? response = await cycleService.GetAllPayoutCyclesAsync(accountId);

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
