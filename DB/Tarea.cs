using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB
{
    public class Tarea
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Tarea_id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nombre { get; set; }

        [StringLength(500)]
        public string Descripcion { get; set; }

        // Relación con SubGrupo
        [ForeignKey("SubGrupo")]
        public int SubGrupoId { get; set; }
        public virtual SubGrupo SubGrupo { get; set; }

        // Relación con Usuario (Creador de la tarea)
        [ForeignKey("Creador")]
        public int Usuario_Id { get; set; }
        public virtual Usuario Creador { get; set; }

        [Required]
        public DateTime FechaCreacion { get; set; }

        public DateTime FechaVencimiento { get; set; }

        // Relación con TareaUsuario (asignaciones)
        public virtual ICollection<TareaUsuario> TareaUsuarios { get; set; }
    }
}
