using Bluroom.Server.Dtos.Group;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Bluroom.Server.Services
{
    public class GroupService : IGroupService
    {
        private readonly BluroomContext _context;

        public GroupService(BluroomContext context)
        {
            _context = context;
        }
        public async Task<Grupo> Create(GroupCreateDTO groupCreateDTO)
        {

            try
            {
                var nuevoGrupo = new Grupo
                {
                    Nombre = groupCreateDTO.Name,
                    Usuario_Id = groupCreateDTO.Id_user,
                    FechaCreacion = DateTime.Now
                };

                await _context.Grupos.AddAsync(nuevoGrupo);
                await _context.SaveChangesAsync();

                return nuevoGrupo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear el grupo: {ex.Message}");
                return null;
            }
        }
        public async Task<List<Grupo>> IndexById(int usuarioId)
        {
            var gruposPropios = _context.Grupos
                .Where(g => g.Usuario_Id == usuarioId);

            var gruposPorSubgrupos = _context.SubgruposUsuarios
                .Where(su => su.UsuarioId == usuarioId)
                .Join(
                    _context.Subgrupos,
                    su => su.SubgrupoId,
                    s => s.SubgrupoId,
                    (su, s) => s.GrupoId
                )
                .Distinct()
                .Join(
                    _context.Grupos,
                    grupoId => grupoId,
                    g => g.Grupo_Id,
                    (grupoId, g) => g
                );

            var grupos = await gruposPropios
                .Union(gruposPorSubgrupos)
                .ToListAsync();

            return grupos;
        }

    }
}
