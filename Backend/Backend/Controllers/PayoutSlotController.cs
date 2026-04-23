using System.Security.Claims;
using Backend.Dtos.PayoutSlotDto;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Services.PayoutSlotService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PayoutSlotController(IPayoutSlotService slotService) : ControllerBase
    {   
        // Allows members's to create payout slots
        [HttpPost("{cycleId}")]
        public async Task<ActionResult> CreatePayoutSlot(int cycleId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<PayoutSlotDto>>? response = await slotService.CreatePayoutSlotsAsync(userId, cycleId);
            return HandleResponse(response);
        }

        // Allows members's to create payout slots
        [HttpPut("{cycleId}/{slotId}")]
        public async Task<ActionResult> ExecutePayoutSlot(int cycleId, int slotId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<PayoutSlotDto>? response = await slotService.ExecutePayoutSlotAsync(userId, cycleId, slotId);
            return HandleResponse(response);
        }

        // Allows members's to create payout slots
        [HttpGet("{cycleId}")]
        public async Task<ActionResult> GetAllPayoutSlot(int cycleId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<PayoutSlotDto>>? response = await slotService.GetAllPayoutSlotsAsync(cycleId);
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
