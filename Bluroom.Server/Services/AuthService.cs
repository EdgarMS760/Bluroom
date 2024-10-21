using Bluroom.Server.Dtos;
using DB;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace Bluroom.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly BluroomContext _context; // Cambia esto por tu DbContext real

        public AuthService(BluroomContext context)
        {
            _context = context;
        }

        public async Task<Usuario> Register(UsuarioRegistroDTO registroDto)
        {
            // Verificar si el usuario ya existe
            if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
                throw new Exception("El correo ya está en uso");

            // Crear nuevo usuario
            var usuario = new Usuario
            {
                FullName = registroDto.FullName,
                Email = registroDto.Email,
                PasswordHash = HashPassword(registroDto.Password), // Hashear la contraseña
                EstaEnLinea = false // Inicialmente no está en línea
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<string> Login(UsuarioLoginDTO loginDto)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null || !VerifyPassword(loginDto.Password, usuario.PasswordHash))
                throw new Exception("Credenciales inválidas");

            usuario.EstaEnLinea = true; 
            await _context.SaveChangesAsync();

            return "Token de autenticación";
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashBytes);
        }

        // Método para verificar la contraseña
        private bool VerifyPassword(string password, string storedHash)
        {
            var hashBytes = Convert.FromBase64String(storedHash);
            using var sha256 = SHA256.Create();
            var computedHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return hashBytes.SequenceEqual(computedHash);
        }
    }
}
