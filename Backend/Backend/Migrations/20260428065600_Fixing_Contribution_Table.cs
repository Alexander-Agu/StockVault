using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Fixing_Contribution_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contribution_PayoutCycles_CycleId",
                table: "Contribution");

            migrationBuilder.RenameColumn(
                name: "CycleId",
                table: "Contribution",
                newName: "SlotId");

            migrationBuilder.RenameIndex(
                name: "IX_Contribution_CycleId",
                table: "Contribution",
                newName: "IX_Contribution_SlotId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contribution_PayoutSlots_SlotId",
                table: "Contribution",
                column: "SlotId",
                principalTable: "PayoutSlots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contribution_PayoutSlots_SlotId",
                table: "Contribution");

            migrationBuilder.RenameColumn(
                name: "SlotId",
                table: "Contribution",
                newName: "CycleId");

            migrationBuilder.RenameIndex(
                name: "IX_Contribution_SlotId",
                table: "Contribution",
                newName: "IX_Contribution_CycleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contribution_PayoutCycles_CycleId",
                table: "Contribution",
                column: "CycleId",
                principalTable: "PayoutCycles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
