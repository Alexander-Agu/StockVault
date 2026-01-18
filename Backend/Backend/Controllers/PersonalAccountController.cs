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

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows user to deposit money into their account
        [HttpPut("deposit/{userId}/{accountId}")]
        public async Task<ActionResult> DepositIntoPersonalAccountAsync(
            int userId,
            int accountId,
            [FromBody] DepositDto deposit)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.DepositAsync(userId, accountId, deposit);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows user to widthdraw money from their account
        [HttpPut("widthdraw/{userId}/{accountId}")]
        public async Task<ActionResult> WidthdrawFromPersonalAccountAsync(
        int userId,
        int accountId,
        [FromBody] WidthdrawDto widthdraw)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.WidthdrawAsync(userId, accountId, widthdraw);

            if (response.Message == "Not enough funds")
            {
                return BadRequest(response);
            }

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows a user to get their personal account
        [HttpGet("{userId}/{accountId}")]
        public async Task<ActionResult> GetPersonalAccountAsync(int userId, int accountId)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.GetPersonalAccount(userId, accountId);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows a user to get all their personal account
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetAllPersonalAccountAsync(int userId, int accountId)
        {
            ApiResponse<List<PersonalAccountDto>>? response = await accountService.GetAllPersonalAccountsAsync(userId);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows a user to lock their account
        [HttpPost("lock/{userId}/{accountId}")]
        public async Task<ActionResult> LockPersonalAccountAsync(
            int userId, 
            int accountId, 
            [FromBody] LockAccountDto accountLock)
        {
            ApiResponse<PersonalAccountDto>? response = await accountService.LockAccountAsync(userId, accountId, accountLock);

            if (response.Message == "Lock already exists")
            {
                return BadRequest(response);
            }

            if (!response.Success)
            {
                return NotFound(response);
            }

            return Ok(response);
        }


        // Allows a user to get their account lock details
        //[HttpGet("lock/{userId}/{lockId}")]
        //public async Task<ActionResult> GetAccountLockAsync(
        //    int userId, 
        //    int lockId)
        //{
        //    ApiResponse<PersonalAccountDto>? response = await accountService.

        //    if (response.Message == "Lock already exists")
        //    {
        //        return BadRequest(response);
        //    }

        //    if (!response.Success)
        //    {
        //        return NotFound(response);
        //    }

        //    return Ok(response);
        //}
    }
}
