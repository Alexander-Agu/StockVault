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

            if (!response.Success) return NotFound(response);

            return Ok(response);
        }


        // Gets current account balance
        [HttpGet("balance/{userId}/{accountId}")]
        public async Task<ActionResult> GetUserBalanceAsync(int userId, int accountId)
        {
            ApiResponse<AccountBalanceDto> response = await transectionService.GetCurrentAmountBalance(userId, accountId);
            
            if (!response.Success) return NotFound(response);

            return Ok(response);
        }


        // Gets all user transection
        [HttpGet("{userId}")]
        public async Task<ActionResult> GetUserTransections(int userId)
        {
            ApiResponse<List<TransectionDto>> response = await transectionService.GetAllUserTransectionsAsync(userId);
            
            if (!response.Success) return NotFound(response);

            return Ok(response);
        }


        // Gets all account transections
        [HttpGet("{userId}/{accountId}")]
        public async Task<ActionResult> GetAccountTransections(int userId, int accountId)
        {
            ApiResponse<List<TransectionDto>> response = await transectionService.GetAllAccountTransectionAsync(userId, accountId);
            
            if (!response.Success) return NotFound(response);

            return Ok(response);
        }
    }
}
