using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class add_class_pause : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Discriminator",
                table: "Salles",
                type: "nvarchar(13)",
                maxLength: 13,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Evier",
                table: "Salles",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Frigo",
                table: "Salles",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MicroOndes",
                table: "Salles",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Discriminator",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "Evier",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "Frigo",
                table: "Salles");

            migrationBuilder.DropColumn(
                name: "MicroOndes",
                table: "Salles");
        }
    }
}
