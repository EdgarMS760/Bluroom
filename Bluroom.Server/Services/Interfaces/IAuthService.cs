using Bluroom.Server.Dtos.User;
using DB;

namespace Bluroom.Server.Services.Interfaces
{
    public interface IAuthService
    {
        Task<Usuario> Register(UsuarioRegistroDTO registroDto);
        Task<(UsuarioSessionDTO, string token)> Login(UsuarioLoginDTO loginDto);
    }
}
