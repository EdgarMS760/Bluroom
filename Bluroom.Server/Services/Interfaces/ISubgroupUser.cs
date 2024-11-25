using Bluroom.Server.Dtos.SubGroup;
using DB;
using Microsoft.AspNetCore.Mvc;

namespace Bluroom.Server.Services.Interfaces
{
    public interface ISubgroupUser
    {
        Task<SubGrupoUsuario> Create(SubgroupUserCreateDTO subgroupUserCreateDTO);
        Task<object> IndexById(int id_subgrupo);
        Task<object> NOIndexById(int id_subgrupo);
    }
}
