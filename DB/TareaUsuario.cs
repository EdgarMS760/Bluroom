using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DB
{
    public class TareaUsuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TareaUsuarioId { get; set; }

        // Relación con Tarea
        [ForeignKey("Tarea")]
        public int Tarea_id { get; set; }
        public virtual Tarea Tarea { get; set; }

        // Relación con Usuario
        [ForeignKey("Usuario")]
        public int Usuario_Id { get; set; }
        public virtual Usuario Usuario { get; set; }

        // Estado de la tarea para este usuario
        [Required]
        [StringLength(20)]
        public string Estatus { get; set; } = "Pendiente";

        // Fecha de completitud para este usuario
        public DateTime? FechaCompletado { get; set; }
    }
}
