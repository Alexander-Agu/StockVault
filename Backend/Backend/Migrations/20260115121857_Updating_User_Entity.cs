using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Updating_User_Entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "otp",
                table: "Users",
                newName: "Otp");

            migrationBuilder.RenameColumn(
                name: "active",
                table: "Users",
                newName: "Active");

            migrationBuilder.AddColumn<DateTime>(
                name: "OtpExpirationTime",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PasswordToken",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "PasswordTokenExpiration",
                table: "Users",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OtpExpirationTime",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordToken",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PasswordTokenExpiration",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Otp",
                table: "Users",
                newName: "otp");

            migrationBuilder.RenameColumn(
                name: "Active",
                table: "Users",
                newName: "active");
        }
    }
}
