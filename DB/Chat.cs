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
        public int Chat_Id { get; set; }
        public string Nombre { get; set; }

        public int Tipo_Chat { get; set; }

        public virtual ICollection<Mensaje> Mensajes { get; set; }
    }
}
