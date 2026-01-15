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
        [HttpPut("verify-email")]
        public async Task<ActionResult<Dictionary<string, object>>> VerifyUserEmailAsync([FromQuery] string email, [FromQuery] string otp)
        {
            var response = await userService.VerifyEmailAsync(email, otp);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }

        
        // Log's user into their account
        [HttpGet("login")]
        public async Task<ActionResult<Dictionary<string, object>>> LoginUserAsync([FromBody] LoginDto loginDetails)
        {
            var response = await userService.LoginAsync(loginDetails);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }

        
        // Log's user out of their account
        [HttpPut("logout/{userId}")]
        public async Task<ActionResult<Dictionary<string, object>>> LogoutUserAsync(int userId)
        {
            var response = await userService.LogoutAsync(userId);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }

        
        // Lets user's update their profile
        [HttpPut("profile/{userId}")]
        public async Task<ActionResult<Dictionary<string, object>>> UpdateUserProfileAsync(int userId, [FromBody] UpdateProfileDto profile)
        {
            var response = await userService.UpdateProfileAsync(userId, profile);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }

        
        // Fetches the user's profile
        [HttpGet("profile/{userId}")]
        public async Task<ActionResult<Dictionary<string, object>>> GetUserProfileAsync(int userId)
        {
            var response = await userService.GetProfileAsync(userId);

            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }
    }
}
