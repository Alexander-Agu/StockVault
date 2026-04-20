using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Fixed_Payout_Cycle_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PayoutCycles_JointAccounts_JointAccountId1",
                table: "PayoutCycles");

            migrationBuilder.DropIndex(
                name: "IX_PayoutCycles_JointAccountId1",
                table: "PayoutCycles");

            migrationBuilder.DropColumn(
                name: "JointAccountId1",
                table: "PayoutCycles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JointAccountId1",
                table: "PayoutCycles",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PayoutCycles_JointAccountId1",
                table: "PayoutCycles",
                column: "JointAccountId1");

            migrationBuilder.AddForeignKey(
                name: "FK_PayoutCycles_JointAccounts_JointAccountId1",
                table: "PayoutCycles",
                column: "JointAccountId1",
                principalTable: "JointAccounts",
                principalColumn: "Id");
        }
    }
}
