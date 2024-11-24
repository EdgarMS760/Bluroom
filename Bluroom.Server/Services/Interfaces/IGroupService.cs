
using Bluroom.Server.Dtos.Group;
using DB;

namespace Bluroom.Server.Services.Interfaces
{
    public interface IGroupService
    {
        Task<Grupo> Create(GroupCreateDTO groupCreateDTO);
        Task<List<Grupo>> IndexById(int id_user);
    }
}
