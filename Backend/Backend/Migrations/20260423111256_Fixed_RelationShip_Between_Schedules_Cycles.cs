using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Fixed_RelationShip_Between_Schedules_Cycles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContributionScheduleId",
                table: "PayoutCycles",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_ContributionScheduleId",
                table: "PayoutCycles",
                column: "ContributionScheduleId");

            migrationBuilder.AddForeignKey(
                name: "FK_PayoutCycles_ContributionSchedules_ContributionScheduleId",
                table: "PayoutCycles",
                column: "ContributionScheduleId",
                principalTable: "ContributionSchedules",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayoutCycles_ContributionSchedules_ContributionScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropIndex(
                name: "IX_PayoutCycles_ContributionScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropColumn(
                name: "ContributionScheduleId",
                table: "PayoutCycles");
        }
    }
}
