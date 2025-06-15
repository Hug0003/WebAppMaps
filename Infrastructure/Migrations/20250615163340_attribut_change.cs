using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class attribut_change : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Cafetiere",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "Climatisation",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "ConnexionInternet",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "EclairageReglable",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "Isolement",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "MaterielDisponible",
                table: "Salles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Cafetiere",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Climatisation",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ConnexionInternet",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EclairageReglable",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Isolement",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaterielDisponible",
                table: "Salles",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
