using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SalleReunion_SallePause_ajout_attribut : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Niveau",
                table: "Salles",
                newName: "Numero");

            migrationBuilder.RenameColumn(
                name: "CoordY2",
                table: "Salles",
                newName: "CoordY2BotRight");

            migrationBuilder.RenameColumn(
                name: "CoordY1",
                table: "Salles",
                newName: "CoordY1TopLeft");

            migrationBuilder.RenameColumn(
                name: "CoordX2",
                table: "Salles",
                newName: "CoordXTopLeft");

            migrationBuilder.RenameColumn(
                name: "CoordX1",
                table: "Salles",
                newName: "CoordX2BotRight");

            migrationBuilder.AddColumn<bool>(
                name: "Favori",
                table: "Salles",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "ImageSalle",
                table: "Salles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "NbPlace",
                table: "Salles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Favori",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "ImageSalle",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "NbPlace",
                table: "Salles");

            migrationBuilder.RenameColumn(
                name: "Numero",
                table: "Salles",
                newName: "Niveau");

            migrationBuilder.RenameColumn(
                name: "CoordY2BotRight",
                table: "Salles",
                newName: "CoordY2");

            migrationBuilder.RenameColumn(
                name: "CoordY1TopLeft",
                table: "Salles",
                newName: "CoordY1");

            migrationBuilder.RenameColumn(
                name: "CoordXTopLeft",
                table: "Salles",
                newName: "CoordX2");

            migrationBuilder.RenameColumn(
                name: "CoordX2BotRight",
                table: "Salles",
                newName: "CoordX1");
        }
    }
}
