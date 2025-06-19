using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddSalleCoordinates : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Ajouter les colonnes manuellement avec SQL brut
            migrationBuilder.Sql("ALTER TABLE Salles ADD CoordonneeX FLOAT NULL");
            migrationBuilder.Sql("ALTER TABLE Salles ADD CoordonneeY FLOAT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Supprimer les colonnes
            migrationBuilder.Sql("ALTER TABLE Salles DROP COLUMN CoordonneeX");
            migrationBuilder.Sql("ALTER TABLE Salles DROP COLUMN CoordonneeY");
        }
    }
}
