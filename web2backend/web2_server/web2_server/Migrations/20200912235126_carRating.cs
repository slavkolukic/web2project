using Microsoft.EntityFrameworkCore.Migrations;

namespace web2_server.Migrations
{
    public partial class carRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarRating",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "NumberOfRatings",
                table: "Cars",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarRating",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "NumberOfRatings",
                table: "Cars");
        }
    }
}
