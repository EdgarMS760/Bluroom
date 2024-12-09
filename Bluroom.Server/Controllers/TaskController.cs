using Bluroom.Server.Dtos.Task;
using Bluroom.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateTask([FromBody] TaskCreateDTO taskCreateDTO)
        {
            try
            {
                var task = await _taskService.Create(taskCreateDTO);
                return Ok(task);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/{SubgroupId}")]
        public async Task<IActionResult> GetTasksByUser(int SubgroupId)
        {
            try
            {
                var tasks = await _taskService.GetTasksBySubgroupId(SubgroupId);
                if (tasks == null || !tasks.Any())
                {
                    return NotFound("No se encontraron tareas para el usuario.");
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
