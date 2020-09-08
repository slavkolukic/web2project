using Microsoft.EntityFrameworkCore.Migrations;

namespace web2_server.Migrations
{
    public partial class offices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_RentACarCompanies_RentACarCompanyId",
                table: "Cars");

            migrationBuilder.DropIndex(
                name: "IX_Cars_RentACarCompanyId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "RentACarCompanyId",
                table: "Cars");

            migrationBuilder.AlterColumn<string>(
                name: "TypeOfCar",
                table: "Cars",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "OfficeId",
                table: "Cars",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Offices",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Address = table.Column<string>(nullable: true),
                    City = table.Column<string>(nullable: true),
                    RentACarCompanyId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Offices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Offices_RentACarCompanies_RentACarCompanyId",
                        column: x => x.RentACarCompanyId,
                        principalTable: "RentACarCompanies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cars_OfficeId",
                table: "Cars",
                column: "OfficeId");

            migrationBuilder.CreateIndex(
                name: "IX_Offices_RentACarCompanyId",
                table: "Offices",
                column: "RentACarCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_Offices_OfficeId",
                table: "Cars",
                column: "OfficeId",
                principalTable: "Offices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cars_Offices_OfficeId",
                table: "Cars");

            migrationBuilder.DropTable(
                name: "Offices");

            migrationBuilder.DropIndex(
                name: "IX_Cars_OfficeId",
                table: "Cars");

            migrationBuilder.DropColumn(
                name: "OfficeId",
                table: "Cars");

            migrationBuilder.AlterColumn<int>(
                name: "TypeOfCar",
                table: "Cars",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RentACarCompanyId",
                table: "Cars",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Cars_RentACarCompanyId",
                table: "Cars",
                column: "RentACarCompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cars_RentACarCompanies_RentACarCompanyId",
                table: "Cars",
                column: "RentACarCompanyId",
                principalTable: "RentACarCompanies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
