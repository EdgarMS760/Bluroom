
using Bluroom.Server.Dtos.SubGroup;
using Bluroom.Server.Services;
using Bluroom.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubGroupController:ControllerBase
    {
        private readonly ISubGroup _subGroupService;

        public SubGroupController(ISubGroup subGroupService)
        {
            _subGroupService = subGroupService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CrearSubGrupo([FromBody] SubGroupCreateDTO groupCreateDTO)
        {
            try
            {
                var subgrupo = await _subGroupService.Create(groupCreateDTO);
                return Ok(subgrupo);
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
            var subgrupos = await _subGroupService.IndexById(id);

            if (subgrupos == null)
            {
                return NotFound("No se encontraron subgrupos para el grupo.");
            }

            return Ok(subgrupos);
        }
    }
}
