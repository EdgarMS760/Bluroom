namespace Bluroom.Server.Dtos.Task
{
    public class TaskResponseDTO
    {
        public int Tarea_id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public int SubGrupoId { get; set; }
        public int Usuario_Id { get; set; }
        public DateTime FechaCreacion { get; set; }
        public DateTime FechaVencimiento { get; set; }
    }
}
