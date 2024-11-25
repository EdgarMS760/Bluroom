using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class subgruposUsuario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SubgruposUsuarios",
                columns: table => new
                {
                    SubgrupoId = table.Column<int>(type: "int", nullable: false),
                    UsuarioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubgruposUsuarios", x => new { x.SubgrupoId, x.UsuarioId });
                    table.ForeignKey(
                        name: "FK_SubgruposUsuarios_Subgrupos_SubgrupoId",
                        column: x => x.SubgrupoId,
                        principalTable: "Subgrupos",
                        principalColumn: "SubgrupoId");
                    table.ForeignKey(
                        name: "FK_SubgruposUsuarios_Usuarios_UsuarioId",
                        column: x => x.UsuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "Usuario_Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_SubgruposUsuarios_UsuarioId",
                table: "SubgruposUsuarios",
                column: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SubgruposUsuarios");
        }
    }
}
