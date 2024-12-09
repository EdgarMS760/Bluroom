using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class tasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tareas",
                columns: table => new
                {
                    Tarea_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Descripcion = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    SubGrupoId = table.Column<int>(type: "int", nullable: false),
                    Usuario_Id = table.Column<int>(type: "int", nullable: false),
                    FechaCreacion = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FechaVencimiento = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tareas", x => x.Tarea_id);
                    table.ForeignKey(
                        name: "FK_Tareas_Subgrupos_SubGrupoId",
                        column: x => x.SubGrupoId,
                        principalTable: "Subgrupos",
                        principalColumn: "SubgrupoId");
                    table.ForeignKey(
                        name: "FK_Tareas_Usuarios_Usuario_Id",
                        column: x => x.Usuario_Id,
                        principalTable: "Usuarios",
                        principalColumn: "Usuario_Id");
                });

            migrationBuilder.CreateTable(
                name: "TareaUsuarios",
                columns: table => new
                {
                    Tarea_id = table.Column<int>(type: "int", nullable: false),
                    Usuario_Id = table.Column<int>(type: "int", nullable: false),
                    TareaUsuarioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Estatus = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FechaCompletado = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SubgrupoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TareaUsuarios", x => new { x.Tarea_id, x.Usuario_Id });
                    table.ForeignKey(
                        name: "FK_TareaUsuarios_Subgrupos_SubgrupoId",
                        column: x => x.SubgrupoId,
                        principalTable: "Subgrupos",
                        principalColumn: "SubgrupoId");
                    table.ForeignKey(
                        name: "FK_TareaUsuarios_Tareas_Tarea_id",
                        column: x => x.Tarea_id,
                        principalTable: "Tareas",
                        principalColumn: "Tarea_id");
                    table.ForeignKey(
                        name: "FK_TareaUsuarios_Usuarios_Usuario_Id",
                        column: x => x.Usuario_Id,
                        principalTable: "Usuarios",
                        principalColumn: "Usuario_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tareas_SubGrupoId",
                table: "Tareas",
                column: "SubGrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_Tareas_Usuario_Id",
                table: "Tareas",
                column: "Usuario_Id");

            migrationBuilder.CreateIndex(
                name: "IX_TareaUsuarios_SubgrupoId",
                table: "TareaUsuarios",
                column: "SubgrupoId");

            migrationBuilder.CreateIndex(
                name: "IX_TareaUsuarios_Usuario_Id",
                table: "TareaUsuarios",
                column: "Usuario_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TareaUsuarios");

            migrationBuilder.DropTable(
                name: "Tareas");
        }
    }
}
