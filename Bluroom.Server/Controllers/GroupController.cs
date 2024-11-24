using Bluroom.Server.Dtos.Group;
using Bluroom.Server.Dtos.User;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GroupController : ControllerBase
    {
        private readonly IGroupService _groupService;

        public GroupController(IGroupService groupService)
        {
            _groupService = groupService;
        }


        [HttpPost("create")]
        public async Task<IActionResult> CrearGrupo([FromBody] GroupCreateDTO groupCreateDTO)
        {
            try
            {
                var grupo = await _groupService.Create(groupCreateDTO);
                return Ok(grupo);
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
            var grupos = await _groupService.IndexById(id);

            if (grupos == null || grupos.Count == 0)
            {
                return NotFound("No se encontraron grupos para el usuario.");
            }

            return Ok(grupos);
        }
    }

}
