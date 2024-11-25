using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DB.Migrations
{
    /// <inheritdoc />
    public partial class chatsImprove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Nombre",
                table: "Chats");

            migrationBuilder.RenameColumn(
                name: "Chat_Id",
                table: "Chats",
                newName: "Chat_id");

            migrationBuilder.RenameColumn(
                name: "Tipo_Chat",
                table: "Chats",
                newName: "Usuario2Id");

            migrationBuilder.RenameColumn(
                name: "Fecha_Creacion",
                table: "Chats",
                newName: "FechaCreacion");

            migrationBuilder.AddColumn<int>(
                name: "Usuario1Id",
                table: "Chats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Chats_Usuario1Id",
                table: "Chats",
                column: "Usuario1Id");

            migrationBuilder.CreateIndex(
                name: "IX_Chats_Usuario2Id",
                table: "Chats",
                column: "Usuario2Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Usuarios_Usuario1Id",
                table: "Chats",
                column: "Usuario1Id",
                principalTable: "Usuarios",
                principalColumn: "Usuario_Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Chats_Usuarios_Usuario2Id",
                table: "Chats",
                column: "Usuario2Id",
                principalTable: "Usuarios",
                principalColumn: "Usuario_Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Usuarios_Usuario1Id",
                table: "Chats");

            migrationBuilder.DropForeignKey(
                name: "FK_Chats_Usuarios_Usuario2Id",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_Usuario1Id",
                table: "Chats");

            migrationBuilder.DropIndex(
                name: "IX_Chats_Usuario2Id",
                table: "Chats");

            migrationBuilder.DropColumn(
                name: "Usuario1Id",
                table: "Chats");

            migrationBuilder.RenameColumn(
                name: "Chat_id",
                table: "Chats",
                newName: "Chat_Id");

            migrationBuilder.RenameColumn(
                name: "Usuario2Id",
                table: "Chats",
                newName: "Tipo_Chat");

            migrationBuilder.RenameColumn(
                name: "FechaCreacion",
                table: "Chats",
                newName: "Fecha_Creacion");

            migrationBuilder.AddColumn<string>(
                name: "Nombre",
                table: "Chats",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
