using Bluroom.Server.Dtos.SubGroup;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bluroom.Server.Services
{
    public class SubgroupUserService : ISubgroupUser
    {
        private readonly BluroomContext _context;

        public SubgroupUserService(BluroomContext context)
        {
            _context = context;
        }
        public async Task<SubGrupoUsuario> Create(SubgroupUserCreateDTO subgroupUserCreateDTO)
        {

            try
            {
                var nuevoSubGrupoUsuario = new SubGrupoUsuario
                {
                    SubgrupoId = subgroupUserCreateDTO.SubgrupoId,
                    UsuarioId = subgroupUserCreateDTO.UserId
                };

                await _context.SubgruposUsuarios.AddAsync(nuevoSubGrupoUsuario);
                await _context.SaveChangesAsync();

                return nuevoSubGrupoUsuario;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al agregar usuario al grupo: {ex.Message}");
                return null;
            }
        }
        public async Task<object> IndexById(int subgrupoId)
        {
            var usuarios = await _context.SubgruposUsuarios
                .Where(su => su.SubgrupoId == subgrupoId) 
                .Select(su => new
                {
                    su.UsuarioId,
                    UsuarioNombre = su.Usuario.FullName,
                    avatar= su.Usuario.Avatar.ToString()
                })
                .ToListAsync();

            return usuarios;
        }
        public async Task<object> NOIndexById(int subgrupoId)
        {
            var usuariosNoPertenecen = await _context.Usuarios
                .Where(u => !_context.SubgruposUsuarios
                    .Any(su => su.SubgrupoId == subgrupoId && su.UsuarioId == u.Usuario_Id))
                .Select(u => new
                {
                    u.Usuario_Id,
                    UsuarioNombre = u.FullName,
                    avatar = u.Avatar.ToString()
                })
                .ToListAsync();

            return usuariosNoPertenecen;
        }

    }
}
