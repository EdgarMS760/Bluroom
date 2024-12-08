﻿using Bluroom.Server.Dtos.SubGroup;
using Bluroom.Server.Services.Interfaces;
using DB;
using Microsoft.EntityFrameworkCore;

namespace Bluroom.Server.Services
{
    public class SubGroupService : ISubGroup
    {
        private readonly BluroomContext _context;

        public SubGroupService(BluroomContext context)
        {
            _context = context;
        }

        public async Task<SubGrupo> Create(SubGroupCreateDTO subgroupCreateDTO)
        {

            try
            {
                var nuevoSubGrupo = new SubGrupo
                {
                    Nombre = subgroupCreateDTO.Nombre,
                    GrupoId = subgroupCreateDTO.GrupoId,
                    FechaCreacion = DateTime.Now
                };

                await _context.Subgrupos.AddAsync(nuevoSubGrupo);
                await _context.SaveChangesAsync();

                return nuevoSubGrupo;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error al crear el grupo: {ex.Message}");
                return null;
            }
        }
        public async Task<object> IndexById(int idGrupo)
        {
            var grupo = await _context.Grupos
                .Where(g => g.Grupo_Id == idGrupo)
                .Select(g => new
                {
                    GrupoId = g.Grupo_Id,
                    Nombre = g.Nombre
                })
                .FirstOrDefaultAsync();

            if (grupo == null)
            {
                return null;
            }

            var subgrupos = await _context.Subgrupos
                .Where(s => s.GrupoId == idGrupo)
                .Select(s => new
                {
                    SubgrupoId = s.SubgrupoId,
                    Nombre = s.Nombre,
                    FechaCreacion = s.FechaCreacion
                })
                .ToListAsync();

            var respuesta = new
            {
                GrupoId = grupo.GrupoId,
                Nombre = grupo.Nombre,
                Subgrupos = subgrupos
            };

            return respuesta;
        }

    }
}
