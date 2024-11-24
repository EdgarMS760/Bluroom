using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class Grupo
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Grupo_Id { get; set; }

        [ForeignKey("Creador")]
        public int Usuario_Id { get; set; }

        public string Nombre { get; set; }

        public DateTime FechaCreacion { get; set; }

        public virtual Usuario Creador { get; set; }
    }

}
