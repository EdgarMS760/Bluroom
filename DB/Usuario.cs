using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DB
{
    public class Usuario
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Usuario_Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }

        public Avatar Avatar { get; set; }
        public bool EstaEnLinea { get; set; }

        public virtual ICollection<Grupo> GruposCreados { get; set; }

    }
    public enum Avatar
    {
        avatar1 = 1,
        avatar2 = 2,
        avatar3 = 3,
        avatar4 = 4,
        avatar5 = 5
    }
}
