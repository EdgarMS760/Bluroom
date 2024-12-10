using Bluroom.Server.Dtos.Task;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;

namespace Bluroom.Server.Services
{
    public class TaskService : ITaskService
    {
        private readonly BluroomContext _context;

        public TaskService(BluroomContext context)
        {
            _context = context;
        }

        public async Task<TaskResponseDTO> Create(TaskCreateDTO taskCreateDTO)
        {
            var task = new Tarea
            {
                Nombre = taskCreateDTO.Nombre,
                Descripcion = taskCreateDTO.Descripcion,
                SubGrupoId = taskCreateDTO.SubGrupoId,
                Usuario_Id = taskCreateDTO.Usuario_Id,
                FechaCreacion = DateTime.UtcNow,
                FechaVencimiento = taskCreateDTO.FechaVencimiento // Permite null
            };

            _context.Tareas.Add(task);
            await _context.SaveChangesAsync();

            return new TaskResponseDTO
            {
                Tarea_id = task.Tarea_id,
                Nombre = task.Nombre,
                Descripcion = task.Descripcion,
                SubGrupoId = task.SubGrupoId,
                Usuario_Id = task.Usuario_Id,
                FechaCreacion = task.FechaCreacion,
                FechaVencimiento = task.FechaVencimiento // Permite null
            };
        }

        public async Task<List<TaskResponseDTO>> GetTasksBySubgroupId(int SubgroupId)
        {
            return await _context.Tareas
                .Where(t => t.SubGrupoId == SubgroupId)
                .Select(t => new TaskResponseDTO
                {
                    Tarea_id = t.Tarea_id,
                    Nombre = t.Nombre,
                    Descripcion = t.Descripcion,
                    SubGrupoId = t.SubGrupoId,
                    Usuario_Id = t.Usuario_Id,
                    FechaCreacion = t.FechaCreacion,
                    FechaVencimiento = t.FechaVencimiento
                })
                .ToListAsync();
        }
    }
}
