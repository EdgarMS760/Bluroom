using Bluroom.Server.Dtos.Group;
using Bluroom.Server.Dtos.SubGroup;
using Bluroom.Server.Services;
using Bluroom.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubgroupUserController : ControllerBase
    {
        private readonly ISubgroupUser _subgroupUser;

        public SubgroupUserController(ISubgroupUser subgroupUser)
        {
            _subgroupUser = subgroupUser;
        }
        [HttpPost("create")]
        public async Task<IActionResult> CrearGrupo([FromBody] SubgroupUserCreateDTO subgroupUserCreateDTO)
        {
            try
            {
                var subGrupoUsuario = await _subgroupUser.Create(subgroupUserCreateDTO);
                return Ok(subGrupoUsuario);
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
            var usuarios = await _subgroupUser.IndexById(id);

            if (usuarios == null)
            {
                return NotFound("No se encontraron usuarios en el subgrupo.");
            }

            return Ok(usuarios);
        } [HttpGet]
        [Route("NOindex/{id}")]
        public async Task<IActionResult> NOIndexById(int id)
        {
            var usuarios = await _subgroupUser.NOIndexById(id);

            if (usuarios == null)
            {
                return NotFound("No se encontraron usuarios que no pertenezcan a el subgrupo.");
            }

            return Ok(usuarios);
        }
    }
}
