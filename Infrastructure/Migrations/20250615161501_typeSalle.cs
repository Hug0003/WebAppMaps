using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class typeSalle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "Distributeur",
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

            migrationBuilder.AddColumn<int>(
                name: "NbChaises",
                table: "Salles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "NbTables",
                table: "Salles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PriseElectrique",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TypeSalle",
                table: "Salles",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "Distributeur",
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

            migrationBuilder.DropColumn(
                name: "NbChaises",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "NbTables",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "PriseElectrique",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "TypeSalle",
                table: "Salles");
        }
    }
}
