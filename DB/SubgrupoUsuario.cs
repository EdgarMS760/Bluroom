using DB.Migrations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class SubGrupoUsuario
    {
        public int SubgrupoId { get; set; }
        public SubGrupo Subgrupo { get; set; }

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
    }
}
