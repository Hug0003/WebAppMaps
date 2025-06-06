using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Utilisateur_class_upload2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EmailUtilisateur",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MotDePasseUtilisateur",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NomUtilisateur",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PrenomUtilisateur",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RoleUtilisateur",
                table: "Utilisateurs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EmailUtilisateur",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "MotDePasseUtilisateur",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "NomUtilisateur",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "PrenomUtilisateur",
                table: "Utilisateurs");

            migrationBuilder.DropColumn(
                name: "RoleUtilisateur",
                table: "Utilisateurs");
        }
    }
}
