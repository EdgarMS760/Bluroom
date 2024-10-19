using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class Mensaje
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Mensaje_Id { get; set; }
        public string Contenido { get; set; }
        public DateTime Fecha_Envio { get; set; }
        public int Emisor_Id {  get; set; }

        public int Chat_Id {  get; set; }

        [ForeignKey("Chat_Id")]
        public virtual Chat Chat { get; set; }
        [ForeignKey("Usuario_id")]
        public Usuario Usuario { get; set; }
    }
}
