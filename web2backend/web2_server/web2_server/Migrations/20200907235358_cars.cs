using Microsoft.EntityFrameworkCore.Migrations;

namespace web2_server.Migrations
{
    public partial class cars : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Car_RentACarCompanies_RentACarCompanyId",
                table: "Car");

            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Car",
                table: "Car");

            migrationBuilder.DropColumn(
                name: "BabySeats",
                table: "Car");

            migrationBuilder.RenameTable(
                name: "Car",
                newName: "Cars");

            migrationBuilder.RenameIndex(
                name: "IX_Car_RentACarCompanyId",
                table: "Cars",
                newName: "IX_Cars_RentACarCompanyId");

            migrationBuilder.AddColumn<int>(
                name: "TypeOfCar",
                table: "Cars",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Cars",
                table: "Cars",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_RentACarCompanies_RentACarCompanyId",
                table: "Cars",
                column: "RentACarCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CarReservation_Cars_CarId",
                table: "CarReservation");

            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentACarCompanies_RentACarCompanyId",
                table: "Cars");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Cars",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "TypeOfCar",
                table: "Cars");

            migrationBuilder.RenameTable(
                name: "Cars",
                newName: "Car");

            migrationBuilder.RenameIndex(
                name: "IX_Cars_RentACarCompanyId",
                table: "Car",
                newName: "IX_Car_RentACarCompanyId");

            migrationBuilder.AddColumn<int>(
                name: "BabySeats",
                table: "Car",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Car",
                table: "Car",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Car_RentACarCompanies_RentACarCompanyId",
                table: "Car",
                column: "RentACarCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CarReservation_Car_CarId",
                table: "CarReservation",
                column: "CarId",
                principalTable: "Car",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
