using Bluroom.Server.Dtos;
using Bluroom.Server.Dtos.User;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Bluroom.Server.Services
{
    public class AuthService : IAuthService
    {
        private readonly JwtSettings _jwtSettings;
        private readonly BluroomContext _context;

        public AuthService(BluroomContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }

        public async Task<Usuario> Register(UsuarioRegistroDTO registroDto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
                throw new Exception("El correo ya está en uso");

            var usuario = new Usuario
            {
                FullName = registroDto.FullName,
                Email = registroDto.Email,
                PasswordHash = HashPassword(registroDto.Password),
                Avatar = AsignarAvatarAleatorio(),
                EstaEnLinea = false
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return usuario;
        }

        public async Task<bool> Logout(UsuarioLogoutDTO logoutDTO)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Usuario_Id == logoutDTO.user_id);


            usuario.EstaEnLinea = false;
            await _context.SaveChangesAsync();

            return true;
        } 
        public async Task<(UsuarioSessionDTO, string token)> Login(UsuarioLoginDTO loginDto)
        {
            var usuario = await _context.Usuarios.SingleOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null || !VerifyPassword(loginDto.Password, usuario.PasswordHash))
                throw new Exception("Credenciales inválidas");

            usuario.EstaEnLinea = true;
            await _context.SaveChangesAsync();

            var userSession = new UsuarioSessionDTO
            {
                Id = usuario.Usuario_Id,
                Nombre = usuario.FullName,
                Email = usuario.Email,
                Avatar = usuario.Avatar.ToString(),
                EstaEnLinea = usuario.EstaEnLinea
            };
            var token = GenerarToken(usuario);

            return (userSession, token);
        }
        private Avatar AsignarAvatarAleatorio()
        {
            var valores = Enum.GetValues(typeof(Avatar)); 
            var random = new Random();
            return (Avatar)valores.GetValue(random.Next(valores.Length)); 
        }

        private string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(hashBytes);
        }

        private bool VerifyPassword(string password, string storedHash)
        {
            var hashBytes = Convert.FromBase64String(storedHash);
            using var sha256 = SHA256.Create();
            var computedHash = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return hashBytes.SequenceEqual(computedHash);
        }
        public string GenerarToken(Usuario usuario)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key)); // La clave del appsettings.json
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim("UsuarioId", usuario.Usuario_Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(_jwtSettings.TokenExpiryInMinutes),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
