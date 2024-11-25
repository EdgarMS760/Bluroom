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
        public DbSet<SubGrupoUsuario> SubgruposUsuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubGrupoUsuario>()
                .HasKey(su => new { su.SubgrupoId, su.UsuarioId });

            modelBuilder.Entity<SubGrupoUsuario>()
                .HasOne(su => su.Subgrupo)
                .WithMany(s => s.SubgruposUsuarios)
                .HasForeignKey(su => su.SubgrupoId)
                 .OnDelete(DeleteBehavior.NoAction); ;

            modelBuilder.Entity<SubGrupoUsuario>()
                .HasOne(su => su.Usuario)
                .WithMany(u => u.SubgruposUsuarios)
                .HasForeignKey(su => su.UsuarioId)
                .OnDelete(DeleteBehavior.NoAction);
        }
    }

}
