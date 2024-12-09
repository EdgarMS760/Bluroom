using Bluroom.Server.Dtos.User;
using Bluroom.Server.Services.Interfaces;
using DB;
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
                var (usuario, token) = await _authService.Login(loginDto);

                return Ok(new
                {
                    Usuario = usuario,
                    Token = token
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] UsuarioLogoutDTO logoutDTO)
        {
            try
            {
                var result = await _authService.Logout(logoutDTO);

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

}
