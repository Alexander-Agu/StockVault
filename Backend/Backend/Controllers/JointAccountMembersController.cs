using System.Security.Claims;
using Backend.Dtos.JointAccountMembersDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.JointAccountMembersService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/v1/joint-accounts/{jointAccountId}/members")]
    [ApiController]
    [Authorize]
    public class JointAccountMembersController(IJointAccountMembersService membersService) : Controller
    {
        [HttpPost]
        public async Task<ActionResult> AddMember(int jointAccountId, [FromBody] AddMemberDto addMember)
        {
            int userId = GetUserIdFromClaims();
            var response = await membersService.AddMemberAsync(userId, jointAccountId, addMember);
            return HandleResponse(response);
        }

        [HttpDelete("{userId}")]
        public async Task<ActionResult> RemoveMember(int jointAccountId, int userId)
        {
            int currentUserId = GetUserIdFromClaims();
            var response = await membersService.RemoveMemberAsync(currentUserId, jointAccountId, userId);
            return HandleResponse(response);
        }

        [HttpPut("{userId}/role")]
        public async Task<ActionResult> ChangeRole(int jointAccountId, int userId, [FromBody] ChangeRoleDto changeRole)
        {
            int currentUserId = GetUserIdFromClaims();
            var response = await membersService.ChangeRoleAsync(currentUserId, jointAccountId, userId, changeRole);
            return HandleResponse(response);
        }

        [HttpGet]
        public async Task<ActionResult> GetMembers(int jointAccountId)
        {
            int userId = GetUserIdFromClaims();
            var response = await membersService.GetMembersAsync(userId, jointAccountId);
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