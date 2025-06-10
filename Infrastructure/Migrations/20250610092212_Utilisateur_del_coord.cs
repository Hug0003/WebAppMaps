using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Utilisateur_del_coord : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoordX2BotRight",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "CoordXTopLeft",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "CoordY1TopLeft",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "CoordY2BotRight",
                table: "Salles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "CoordX2BotRight",
                table: "Salles",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CoordXTopLeft",
                table: "Salles",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CoordY1TopLeft",
                table: "Salles",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "CoordY2BotRight",
                table: "Salles",
                type: "float",
                nullable: true);
        }
    }
}
