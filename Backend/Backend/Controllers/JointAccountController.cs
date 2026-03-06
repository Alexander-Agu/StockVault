using System.Security.Claims;
using System.Security.Principal;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.JointAccountService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    [Authorize]
    public class JointAccountController(IJointAccountService accountService) : Controller
    {
        // Allows user's to create a joint account
        [HttpPost("")]
        public async Task<ActionResult> CreateJointAccount([FromBody] CreateAccountDto newAccount)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<JointAccountDto>? response = await accountService.CreateJointAccountAsync(userId, newAccount);

            return HandleResponse(response);
        }

        [HttpGet("{accountId}")]
        public async Task<ActionResult> GetJointAccountAsync(int accountId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<JointAccountDto>? response = await accountService.GetJointAccountAsync(userId, accountId);

            return HandleResponse(response);
        }

        [HttpGet("")]
        public async Task<ActionResult> GetAllJointAccountAsync()
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<List<JointAccountDto>>? response = await accountService.GetAllJointAccountsAsync(userId);

            return HandleResponse(response);
        }

        [HttpDelete("{accountId}")]
        public async Task<ActionResult> DeleteJointAccountAsync(int accountId)
        {
            int userId = GetUserIdFromClaims();
            ApiResponse<JointAccountDto>? response = await accountService.DeleteJointAccountAsync(userId, accountId);

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
