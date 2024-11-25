using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class SubGrupo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int SubgrupoId { get; set; }

        public int GrupoId { get; set; }

        [ForeignKey("GrupoId")]
        public Grupo Grupo { get; set; }

        public string Nombre { get; set; }
        public DateTime FechaCreacion { get; set; }
        public ICollection<SubGrupoUsuario> SubgruposUsuarios { get; set; }

    }
}
