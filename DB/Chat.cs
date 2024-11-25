using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class Chat
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Chat_id { get; set; }

        [Required]
        public int Usuario1Id { get; set; } 

        [Required]
        public int Usuario2Id { get; set; } 

        [ForeignKey(nameof(Usuario1Id))]
        public virtual Usuario Usuario1 { get; set; } 

        [ForeignKey(nameof(Usuario2Id))]
        public virtual Usuario Usuario2 { get; set; } 

        public DateTime FechaCreacion { get; set; } 
    }
}
