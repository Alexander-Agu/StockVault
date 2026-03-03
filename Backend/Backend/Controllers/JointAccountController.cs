using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.JointAccountService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class JointAccountController(IJointAccountService jointAccountService) : Controller
    {
        // Creates a new joint account
        [HttpPost]
        public async Task<ActionResult> CreateJointAccountAsync([FromBody] CreateJointAccountDto newAccount)
        {
            var userId = User.FindFirst("id")?.Value;

            if (!int.TryParse(userId, out int userIdParsed))
            {
                return Unauthorized();
            }

            var response = await jointAccountService.CreateJointAccountAsync(userIdParsed, newAccount);

            return HandleResponse(response);
        }


        // Lists all joint accounts created by the authenticated user
        [HttpGet]
        public async Task<ActionResult> GetUserJointAccountsAsync()
        {
            var userId = User.FindFirst("id")?.Value;

            if (!int.TryParse(userId, out int userIdParsed))
            {
                return Unauthorized();
            }

            var response = await jointAccountService.GetUserJointAccountsAsync(userIdParsed);

            return HandleResponse(response);
        }


        // Fetches details of a specific joint account
        [HttpGet("{id}")]
        public async Task<ActionResult> GetJointAccountDetailsAsync(int id)
        {
            var userId = User.FindFirst("id")?.Value;

            if (!int.TryParse(userId, out int userIdParsed))
            {
                return Unauthorized();
            }

            var response = await jointAccountService.GetJointAccountDetailsAsync(id, userIdParsed);

            return HandleResponse(response);
        }


        // Deletes/closes a joint account
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteJointAccountAsync(int id)
        {
            var userId = User.FindFirst("id")?.Value;

            if (!int.TryParse(userId, out int userIdParsed))
            {
                return Unauthorized();
            }

            var response = await jointAccountService.DeleteJointAccountAsync(id, userIdParsed);

            return HandleResponse(response);
        }


        /*
         * TODO: Handles http responses
         */
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
