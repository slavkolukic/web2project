using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace web2_server.Migrations
{
    public partial class RentACarCompany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RaCCompanyId",
                table: "Users",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RentACarCompanies",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(nullable: true),
                    CompanyName = table.Column<string>(nullable: true),
                    Adress = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RentACarCompanies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Car",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Location = table.Column<string>(nullable: true),
                    PricePerDay = table.Column<int>(nullable: false),
                    NumberOfSeats = table.Column<int>(nullable: false),
                    BabySeats = table.Column<int>(nullable: false),
                    Brand = table.Column<string>(nullable: true),
                    Year = table.Column<int>(nullable: false),
                    Model = table.Column<string>(nullable: true),
                    RentACarCompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Car", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Car_RentACarCompanies_RentACarCompanyId",
                        column: x => x.RentACarCompanyId,
                        principalTable: "RentACarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CarReservation",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstDayOfReservaton = table.Column<DateTime>(nullable: false),
                    LastDayOfReservaton = table.Column<DateTime>(nullable: false),
                    TotalPrice = table.Column<int>(nullable: false),
                    CarId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarReservation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarReservation_Car_CarId",
                        column: x => x.CarId,
                        principalTable: "Car",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_RaCCompanyId",
                table: "Users",
                column: "RaCCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Car_RentACarCompanyId",
                table: "Car",
                column: "RentACarCompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CarReservation_CarId",
                table: "CarReservation",
                column: "CarId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_RentACarCompanies_RaCCompanyId",
                table: "Users",
                column: "RaCCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_RentACarCompanies_RaCCompanyId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "CarReservation");

            migrationBuilder.DropTable(
                name: "Car");

            migrationBuilder.DropTable(
                name: "RentACarCompanies");

            migrationBuilder.DropIndex(
                name: "IX_Users_RaCCompanyId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RaCCompanyId",
                table: "Users");
        }
    }
}
