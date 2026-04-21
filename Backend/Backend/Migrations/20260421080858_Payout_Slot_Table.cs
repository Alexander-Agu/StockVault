using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Payout_Slot_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PayoutSlots",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Position = table.Column<int>(type: "INTEGER", nullable: false),
                    IsPaidOut = table.Column<bool>(type: "INTEGER", nullable: false),
                    PayoutDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    CycleId = table.Column<int>(type: "INTEGER", nullable: false),
                    PayoutCycleId = table.Column<int>(type: "INTEGER", nullable: false),
                    UserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayoutSlots", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayoutSlots_PayoutCycles_PayoutCycleId",
                        column: x => x.PayoutCycleId,
                        principalTable: "PayoutCycles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayoutSlots_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PayoutSlots_PayoutCycleId",
                table: "PayoutSlots",
                column: "PayoutCycleId");

            migrationBuilder.CreateIndex(
                name: "IX_PayoutSlots_UserId",
                table: "PayoutSlots",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PayoutSlots");
        }
    }
}
