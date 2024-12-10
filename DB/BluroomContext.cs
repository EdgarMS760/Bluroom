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
        public DbSet<Tarea> Tareas { get; set; }
        public DbSet<TareaUsuario> TareaUsuarios { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SubGrupoUsuario>()
                .HasKey(su => new { su.SubgrupoId, su.UsuarioId });

            modelBuilder.Entity<SubGrupoUsuario>()
                .HasOne(su => su.Subgrupo)
                .WithMany(s => s.SubgruposUsuarios)
                .HasForeignKey(su => su.SubgrupoId)
                 .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<SubGrupoUsuario>()
                .HasOne(su => su.Usuario)
                .WithMany(u => u.SubgruposUsuarios)
                .HasForeignKey(su => su.UsuarioId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Chat>()
                .HasOne(c => c.Usuario1)
                .WithMany()
                .HasForeignKey(c => c.Usuario1Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Chat>()
                .HasOne(c => c.Usuario2)
                .WithMany()
                .HasForeignKey(c => c.Usuario2Id)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Tarea>()
                .HasOne(t => t.SubGrupo)
                .WithMany(s => s.Tareas)
                .HasForeignKey(t => t.SubGrupoId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Tarea>()
                .HasOne(t => t.Creador)
                .WithMany(u => u.Tareas)
                .HasForeignKey(t => t.Usuario_Id)
                .OnDelete(DeleteBehavior.NoAction);


            // Relación muchos a muchos entre Tarea y Usuario, a través de TareaUsuario
            modelBuilder.Entity<TareaUsuario>()
                .HasKey(tu => new { tu.Tarea_id, tu.Usuario_Id });

            modelBuilder.Entity<TareaUsuario>()
                .HasOne(tu => tu.Tarea)
                .WithMany(t => t.TareaUsuarios)
                .HasForeignKey(tu => tu.Tarea_id)
                .OnDelete(DeleteBehavior.NoAction); 

            modelBuilder.Entity<TareaUsuario>()
                .HasOne(tu => tu.Usuario)
                .WithMany(u => u.TareaUsuarios)
                .HasForeignKey(tu => tu.Usuario_Id)
                .OnDelete(DeleteBehavior.NoAction); 
        }

    }

}
