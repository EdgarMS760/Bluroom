namespace Bluroom.Server.Dtos.Task
{
    public class TaskCreateDTO
    {
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int SubGrupoId { get; set; }
        public int Usuario_Id { get; set; }
        public DateTime FechaVencimiento { get; set; }
    }
}
