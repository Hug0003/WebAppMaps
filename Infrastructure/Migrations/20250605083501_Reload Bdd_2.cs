using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ReloadBdd_2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImageSalle",
                table: "Salles",
                newName: "ImgSallePath");

            migrationBuilder.RenameColumn(
                name: "ImgPlanEtage",
                table: "Etages",
                newName: "ImgPlanEtagePath");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ImgSallePath",
                table: "Salles",
                newName: "ImageSalle");

            migrationBuilder.RenameColumn(
                name: "ImgPlanEtagePath",
                table: "Etages",
                newName: "ImgPlanEtage");
        }
    }
}
