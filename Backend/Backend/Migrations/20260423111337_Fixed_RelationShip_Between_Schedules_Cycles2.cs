using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Fixed_RelationShip_Between_Schedules_Cycles2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayoutCycles_ContributionSchedules_ContributionScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropIndex(
                name: "IX_PayoutCycles_ContributionScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropIndex(
                name: "IX_PayoutCycles_ScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropColumn(
                name: "ContributionScheduleId",
                table: "PayoutCycles");

            migrationBuilder.AddColumn<int>(
                name: "PayoutCycleId",
                table: "ContributionSchedules",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_ScheduleId",
                table: "PayoutCycles",
                column: "ScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_ContributionSchedules_PayoutCycleId",
                table: "ContributionSchedules",
                column: "PayoutCycleId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContributionSchedules_PayoutCycles_PayoutCycleId",
                table: "ContributionSchedules",
                column: "PayoutCycleId",
                principalTable: "PayoutCycles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContributionSchedules_PayoutCycles_PayoutCycleId",
                table: "ContributionSchedules");

            migrationBuilder.DropIndex(
                name: "IX_PayoutCycles_ScheduleId",
                table: "PayoutCycles");

            migrationBuilder.DropIndex(
                name: "IX_ContributionSchedules_PayoutCycleId",
                table: "ContributionSchedules");

            migrationBuilder.DropColumn(
                name: "PayoutCycleId",
                table: "ContributionSchedules");

            migrationBuilder.AddColumn<int>(
                name: "ContributionScheduleId",
                table: "PayoutCycles",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_ContributionScheduleId",
                table: "PayoutCycles",
                column: "ContributionScheduleId");

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_ScheduleId",
                table: "PayoutCycles",
                column: "ScheduleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_PayoutCycles_ContributionSchedules_ContributionScheduleId",
                table: "PayoutCycles",
                column: "ContributionScheduleId",
                principalTable: "ContributionSchedules",
                principalColumn: "Id");
        }
    }
}
