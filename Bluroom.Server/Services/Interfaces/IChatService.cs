using Bluroom.Server.Dtos.User;
using DB;

namespace Bluroom.Server.Services.Interfaces
{
    public interface IChatService
    {
        Task<Chat> Create(ChatCreateDTO chatCreateDTO);
        Task<object> IndexById(int id_group);
    }
}
