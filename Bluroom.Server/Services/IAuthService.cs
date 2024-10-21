using Bluroom.Server.Dtos;
using DB;

namespace Bluroom.Server.Services
{
    public interface IAuthService
    {
        Task<Usuario> Register(UsuarioRegistroDTO registroDto);
        Task<string> Login(UsuarioLoginDTO loginDto);
    }
}
