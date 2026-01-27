using Backend.Dtos.UserDtos;
using Backend.Services.UserService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Dtos.ResponseDto;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(IUserService userService) : Controller
    {
        // Saves new user's data to the database
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUserAsync([FromBody] CreateUserDto newUser)
        {
            var response = await userService.RegisterUserAsync(newUser);

            return HandleResponse(response);
        }

        
        // Verifies user's email
        [HttpPut("verify-email")]
        public async Task<ActionResult> VerifyUserEmailAsync([FromQuery] string email, [FromQuery] string otp)
        {
            var response = await userService.VerifyEmailAsync(email, otp);

            return HandleResponse(response);
        }

        
        // Log's user into their account
        [HttpPost("login")]
        public async Task<ActionResult> LoginUserAsync([FromBody] LoginDto loginDetails)
        {
            var response = await userService.LoginAsync(loginDetails);

            return HandleResponse(response);
        }

        
        // Log's user out of their account
        [HttpPut("logout/{userId}")]
        [Authorize]
        public async Task<ActionResult> LogoutUserAsync(int userId)
        {
            var response = await userService.LogoutAsync(userId);

            return HandleResponse(response);
        }

        
        // Lets user's update their profile
        [HttpPut("profile/{userId}")]
        [Authorize]
        public async Task<ActionResult> UpdateUserProfileAsync(int userId, [FromBody] UpdateProfileDto profile)
        {
            var response = await userService.UpdateProfileAsync(userId, profile);

            return HandleResponse(response);
        }

        
        // Fetches the user's profile
        [HttpGet("profile/{userId}")]
        [Authorize]
        public async Task<ActionResult> GetUserProfileAsync(int userId)
        {
            var response = await userService.GetProfileAsync(userId);

            return HandleResponse(response);
        }

        
        // Send's an email to the user to request a password change
        [HttpPost("forgot-password/")]
        public async Task<ActionResult> ForgotUserPasswordAsync([FromQuery] string email)
        {
            var response = await userService.ForgotPasswordAsync(email);

            return HandleResponse(response);
        }

        
        // Allows users to reset their password
        [HttpPut("reset-password/")]
        public async Task<ActionResult> ResetUserPasswordAsync([FromQuery] string token, [FromBody] ResetPasswordDto newPassword)
        {
            var response = await userService.ResetPasswordAsync(token, newPassword);

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
