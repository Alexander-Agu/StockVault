using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class modifying_jointAccount_relationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JointAccountMembers_JointAccounts_JointAccountId1",
                table: "JointAccountMembers");

            migrationBuilder.DropIndex(
                name: "IX_JointAccountMembers_JointAccountId1",
                table: "JointAccountMembers");

            migrationBuilder.DropColumn(
                name: "JointAccountId1",
                table: "JointAccountMembers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JointAccountId1",
                table: "JointAccountMembers",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JointAccountMembers_JointAccountId1",
                table: "JointAccountMembers",
                column: "JointAccountId1");

            migrationBuilder.AddForeignKey(
                name: "FK_JointAccountMembers_JointAccounts_JointAccountId1",
                table: "JointAccountMembers",
                column: "JointAccountId1",
                principalTable: "JointAccounts",
                principalColumn: "Id");
        }
    }
}
