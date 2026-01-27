using System.Security.Principal;
using Backend.Dtos.AccountDtos;
using Backend.Dtos.AccountLockDtos;
using Backend.Dtos.PersonalAccountDtos;
using Backend.Dtos.ResponseDto;
using Backend.Services.PersonalAccountService;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalAccountController(IPersonalAccountService accountService) : Controller
    {
        // Allows user's to create a personal account
        [HttpPost("create-account/{userId}")]
        public async Task<ActionResult> CreatePersonalAccount(int userId, [FromBody] CreateAccountDto newAccount)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.CreatePersonalAccountAsync(userId, newAccount);

            return HandleResponse(response);
        }


        // Allows user to deposit money into their account
        [HttpPut("deposit/{userId}/{accountId}")]
        public async Task<ActionResult> DepositIntoPersonalAccountAsync(
            int userId,
            int accountId,
            [FromBody] DepositDto deposit)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.DepositAsync(userId, accountId, deposit);

            return HandleResponse(response);
        }


        // Allows user to widthdraw money from their account
        [HttpPut("widthdraw/{userId}/{accountId}")]
        public async Task<ActionResult> WidthdrawFromPersonalAccountAsync(
        int userId,
        int accountId,
        [FromBody] WidthdrawDto widthdraw)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.WidthdrawAsync(userId, accountId, widthdraw);

            return HandleResponse(response);
        }


        // Allows a user to get their personal account
        [HttpGet("{userId}/{accountId}")]
        public async Task<ActionResult> GetPersonalAccountAsync(int userId, int accountId)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.GetPersonalAccount(userId, accountId);

            return HandleResponse(response);
        }


        // Allows a user to get all their personal account
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetAllPersonalAccountAsync(int userId, int accountId)
        {
            ApiResponse<List<PersonalAccountDto>>? response = await accountService.GetAllPersonalAccountsAsync(userId);

            return HandleResponse(response);
        }


        // Allows a user to lock their account
        [HttpPost("lock/{userId}/{accountId}")]
        public async Task<ActionResult> LockPersonalAccountAsync(
            int userId, 
            int accountId, 
            [FromBody] LockAccountDto accountLock)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.LockAccountAsync(userId, accountId, accountLock);

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
