using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Adding_Personal_Account_Tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalAccount_AccountLocks_Id",
                table: "PersonalAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalAccount_Users_UserId",
                table: "PersonalAccount");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PersonalAccount",
                table: "PersonalAccount");

            migrationBuilder.RenameTable(
                name: "PersonalAccount",
                newName: "PersonalAccounts");

            migrationBuilder.RenameIndex(
                name: "IX_PersonalAccount_UserId",
                table: "PersonalAccounts",
                newName: "IX_PersonalAccounts_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PersonalAccounts",
                table: "PersonalAccounts",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalAccounts_AccountLocks_Id",
                table: "PersonalAccounts",
                column: "Id",
                principalTable: "AccountLocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalAccounts_Users_UserId",
                table: "PersonalAccounts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalAccounts_AccountLocks_Id",
                table: "PersonalAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_PersonalAccounts_Users_UserId",
                table: "PersonalAccounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PersonalAccounts",
                table: "PersonalAccounts");

            migrationBuilder.RenameTable(
                name: "PersonalAccounts",
                newName: "PersonalAccount");

            migrationBuilder.RenameIndex(
                name: "IX_PersonalAccounts_UserId",
                table: "PersonalAccount",
                newName: "IX_PersonalAccount_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PersonalAccount",
                table: "PersonalAccount",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalAccount_AccountLocks_Id",
                table: "PersonalAccount",
                column: "Id",
                principalTable: "AccountLocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalAccount_Users_UserId",
                table: "PersonalAccount",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
