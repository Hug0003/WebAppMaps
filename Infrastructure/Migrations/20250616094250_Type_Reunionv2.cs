using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Type_Reunionv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Camera",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Ecran",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "SystemeAudio",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TableauBlanc",
                table: "Salles",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Camera",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "Ecran",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "SystemeAudio",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "TableauBlanc",
                table: "Salles");
        }
    }
}
