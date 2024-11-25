using Bluroom.Server.Dtos.SubGroup;
using Bluroom.Server.Dtos.User;
using Bluroom.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController :ControllerBase
    {
        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }
        [HttpPost("create")]
        public async Task<IActionResult> CrearChat([FromBody] ChatCreateDTO chatCreateDTO)
        {
            try
            {
                var chat = await _chatService.Create(chatCreateDTO);
                return Ok(chat);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("index/{id}")]
        public async Task<IActionResult> IndexById(int id)
        {
            var chats = await _chatService.IndexById(id);

            if (chats == null)
            {
                return NotFound("No se encontraron chats para el usuario.");
            }

            return Ok(chats);
        }
    }
}
