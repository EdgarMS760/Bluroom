using Bluroom.Server.Dtos.SubGroup;
using DB;

namespace Bluroom.Server.Services.Interfaces
{
    public interface ISubGroup
    {
        Task<SubGrupo> Create(SubGroupCreateDTO subgroupCreateDTO);
        Task<object> IndexById(int id_group);
    }
}

