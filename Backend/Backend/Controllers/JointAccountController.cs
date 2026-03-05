using System.Security.Principal;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.JointAccountDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.JointAccountService;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JointAccountController(IJointAccountService accountService) : Controller
    {
        // Allows user's to create a joint account
        [HttpPost("")]
        public async Task<ActionResult> CreateJointAccount([FromRoute] int userId, [FromBody] CreateAccountDto newAccount)
        {
            ApiResponse<JointAccountDto>? response = await accountService.CreateJointAccountAsync(userId, newAccount);

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
