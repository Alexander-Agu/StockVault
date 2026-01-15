using Backend.Dtos.UserDtos;
using Backend.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : Controller
    {
        // Saves new user's data to the database
        [HttpPost("register")]
        public async Task<ActionResult<Dictionary<string, object>>> RegisterUserAsync([FromBody] CreateUserDto newUser)
        {
            var response = await userService.RegisterUserAsync(newUser);
            
            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }

        
        // Verifies user's email
        [HttpPost("verify")]
        public async Task<ActionResult<Dictionary<string, object>>> VerifyUserEmailAsync([FromQuery] string email, [FromQuery] string otp)
        {
            var response = await userService.VerifyEmailAsync(email, otp);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }
    }
}
