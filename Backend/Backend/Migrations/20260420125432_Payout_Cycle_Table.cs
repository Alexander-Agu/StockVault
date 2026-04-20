using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Payout_Cycle_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PayoutCycles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CycleNumber = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalMembersAtStart = table.Column<int>(type: "INTEGER", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    JointAccountId = table.Column<int>(type: "INTEGER", nullable: false),
                    ScheduleId = table.Column<int>(type: "INTEGER", nullable: false),
                    JointAccountId1 = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PayoutCycles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PayoutCycles_ContributionSchedules_ScheduleId",
                        column: x => x.ScheduleId,
                        principalTable: "ContributionSchedules",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayoutCycles_JointAccounts_JointAccountId",
                        column: x => x.JointAccountId,
                        principalTable: "JointAccounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PayoutCycles_JointAccounts_JointAccountId1",
                        column: x => x.JointAccountId1,
                        principalTable: "JointAccounts",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_JointAccountId",
                table: "PayoutCycles",
                column: "JointAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_JointAccountId1",
                table: "PayoutCycles",
                column: "JointAccountId1");

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_ScheduleId",
                table: "PayoutCycles",
                column: "ScheduleId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PayoutCycles");
        }
    }
}
