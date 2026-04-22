using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class New_Columbs_Payout_Cycle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayoutSlots_PayoutCycles_PayoutCycleId",
                table: "PayoutSlots");

            migrationBuilder.DropIndex(
                name: "IX_PayoutSlots_PayoutCycleId",
                table: "PayoutSlots");

            migrationBuilder.DropColumn(
                name: "PayoutCycleId",
                table: "PayoutSlots");

            migrationBuilder.AddColumn<int>(
                name: "EstimatedTotalAmount",
                table: "PayoutCycles",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PayoutCycles",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutSlots_CycleId",
                table: "PayoutSlots",
                column: "CycleId");

            migrationBuilder.AddForeignKey(
                name: "FK_PayoutSlots_PayoutCycles_CycleId",
                table: "PayoutSlots",
                column: "CycleId",
                principalTable: "PayoutCycles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayoutSlots_PayoutCycles_CycleId",
                table: "PayoutSlots");

            migrationBuilder.DropIndex(
                name: "IX_PayoutSlots_CycleId",
                table: "PayoutSlots");

            migrationBuilder.DropColumn(
                name: "EstimatedTotalAmount",
                table: "PayoutCycles");

            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PayoutCycles");

            migrationBuilder.AddColumn<int>(
                name: "PayoutCycleId",
                table: "PayoutSlots",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutSlots_PayoutCycleId",
                table: "PayoutSlots",
                column: "PayoutCycleId");

            migrationBuilder.AddForeignKey(
                name: "FK_PayoutSlots_PayoutCycles_PayoutCycleId",
                table: "PayoutSlots",
                column: "PayoutCycleId",
                principalTable: "PayoutCycles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
