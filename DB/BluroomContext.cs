using Microsoft.EntityFrameworkCore;

namespace DB
{
    public class BluroomContext : DbContext
    {
        public BluroomContext(DbContextOptions<BluroomContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Mensaje> Mensajes { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<Grupo> Grupos { get; set; }
        public DbSet<SubGrupo> Subgrupos { get; set; }
       
    }

}
