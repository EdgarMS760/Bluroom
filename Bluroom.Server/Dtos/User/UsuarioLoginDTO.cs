namespace Bluroom.Server.Dtos.User
{
    public class UsuarioLoginDTO
    {
        public string Email { get; set; }
        public string Password { get; set; }

    } public class UsuarioLogoutDTO
    {
        public int user_id { get; set; }

    }
}
