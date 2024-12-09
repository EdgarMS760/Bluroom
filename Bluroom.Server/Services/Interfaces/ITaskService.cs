using Bluroom.Server.Dtos.Task;
namespace Bluroom.Server.Services.Interfaces

{
    public interface ITaskService
    {
        Task<TaskResponseDTO> Create(TaskCreateDTO taskCreateDTO);
        Task<List<TaskResponseDTO>> GetTasksBySubgroupId(int SubgroupId);
    }
}
