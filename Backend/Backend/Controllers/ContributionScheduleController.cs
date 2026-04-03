using System.Security.Claims;
using Backend.Dtos.ContributionScheduleDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.ContributionScheduleService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/v1")]
    [ApiController]
    [Authorize]
    public class ContributionScheduleController(IContributionScheduleService scheduleService) : Controller
    {
        [HttpPost("joint-accounts/{jointAccountId}/contribution-schedules")]
        public async Task<ActionResult> CreateSchedule(int jointAccountId, [FromBody] CreateScheduleDto createSchedule)
        {
            int userId = 4;
            var response = await scheduleService.CreateScheduleAsync(userId, jointAccountId, createSchedule);
            return HandleResponse(response);
        }

        [HttpPost("contribution-schedules/{id}/activate")]
        public async Task<ActionResult> ActivateSchedule(int id)
        {
            int userId = GetUserIdFromClaims();
            var response = await scheduleService.ActivateScheduleAsync(userId, id);
            return HandleResponse(response);
        }

        [HttpPost("contribution-schedules/{id}/deactivate")]
        public async Task<ActionResult> DeactivateSchedule(int id)
        {
            int userId = GetUserIdFromClaims();
            var response = await scheduleService.DeactivateScheduleAsync(userId, id);
            return HandleResponse(response);
        }

        [HttpPut("contribution-schedules/{id}/frequency")]
        public async Task<ActionResult> UpdateFrequency(int id, [FromBody] UpdateFrequencyDto updateFrequency)
        {
            int userId = GetUserIdFromClaims();
            var response = await scheduleService.UpdateFrequencyAsync(userId, id, updateFrequency);
            return HandleResponse(response);
        }

        [HttpGet("joint-accounts/{jointAccountId}/contribution-schedules/active")]
        public async Task<ActionResult> GetActiveSchedule(int jointAccountId)
        {
            int userId = GetUserIdFromClaims();
            var response = await scheduleService.GetActiveScheduleAsync(userId, jointAccountId);
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