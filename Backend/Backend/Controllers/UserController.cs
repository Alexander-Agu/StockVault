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
        [HttpPost("register")]
        public async Task<ActionResult<Dictionary<string, object>>> RegisterUserAsync([FromBody] CreateUserDto newUser)
        {
            var response = await userService.RegisterUserAsync(newUser);
            
            if (response["result"] == "Error") return BadRequest(response);

            return Ok(response);
        }
    }
}
