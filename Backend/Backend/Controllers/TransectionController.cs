using Backend.Dtos.ResponseDto;
using Backend.Dtos.TransectionDto;
using Backend.Services.TransectionService;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransectionController(ITransectionService transectionService) : Controller
    {
        // Allows a transection to be recorded
        [HttpPost("create/{userId}")]
        public async Task<ActionResult> RecordTransectionAsync(int userId, CreateTransectionDto newTransection)
        {
            ApiResponse<TransectionDto> response = await transectionService.RecordTransectionAsync(userId, newTransection);

            return HandleResponse(response);
        }


        // Gets current account balance
        [HttpGet("balance/{userId}/{accountId}")]
        public async Task<ActionResult> GetUserBalanceAsync(int userId, int accountId)
        {
            ApiResponse<AccountBalanceDto> response = await transectionService.GetCurrentAmountBalance(userId, accountId);

            return HandleResponse(response);
        }


        // Gets all user transection
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetUserTransections(int userId)
        {
            ApiResponse<List<TransectionDto>> response = await transectionService.GetAllUserTransectionsAsync(userId);

            return HandleResponse(response);
        }


        // Gets all account transections
        [HttpGet("{userId}/{accountId}")]
        public async Task<ActionResult> GetAccountTransections(int userId, int accountId)
        {
            ApiResponse<List<TransectionDto>> response = await transectionService.GetAllAccountTransectionAsync(userId, accountId);

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
