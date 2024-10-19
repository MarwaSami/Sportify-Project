using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Models.Migrations
{
    /// <inheritdoc />
    public partial class init3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "PlaceAttachment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 638, DateTimeKind.Local).AddTicks(4843),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 103, DateTimeKind.Local).AddTicks(8193));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "Place",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 637, DateTimeKind.Local).AddTicks(193),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 102, DateTimeKind.Local).AddTicks(6546));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 645, DateTimeKind.Local).AddTicks(5371),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 110, DateTimeKind.Local).AddTicks(8880));

            migrationBuilder.AlterColumn<string>(
                name: "JobTitle",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Job Title",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Trainer");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Description",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Hi I am a good Trainer");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "AdminBlog",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 634, DateTimeKind.Local).AddTicks(5855),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 100, DateTimeKind.Local).AddTicks(1814));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "PlaceAttachment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 103, DateTimeKind.Local).AddTicks(8193),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 638, DateTimeKind.Local).AddTicks(4843));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "Place",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 102, DateTimeKind.Local).AddTicks(6546),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 637, DateTimeKind.Local).AddTicks(193));

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 110, DateTimeKind.Local).AddTicks(8880),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 645, DateTimeKind.Local).AddTicks(5371));

            migrationBuilder.AlterColumn<string>(
                name: "JobTitle",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Trainer",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Job Title");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "Hi I am a good Trainer",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true,
                oldDefaultValue: "Description");

            migrationBuilder.AlterColumn<DateTime>(
                name: "ModificationDate",
                table: "AdminBlog",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 11, 10, 13, 49, 48, 100, DateTimeKind.Local).AddTicks(1814),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2024, 9, 15, 20, 55, 48, 634, DateTimeKind.Local).AddTicks(5855));
        }
    }
}
