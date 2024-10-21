using Bluroom.Server.Dtos;
using Bluroom.Server.Services;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UsuarioRegistroDTO registroDto)
        {
            try
            {
                var usuario = await _authService.Register(registroDto);
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UsuarioLoginDTO loginDto)
        {
            try
            {
                var token = await _authService.Login(loginDto);
                return Ok(new { Token = token }); // Retornar el token
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
