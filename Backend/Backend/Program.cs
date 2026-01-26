using System;
using System.Text;
using Backend.Entities;
using Backend.Repository.AccountLocksRepository;
using Backend.Repository.Data;
using Backend.Repository.PersonalAccountRespository;
using Backend.Repository.TransectionRepository;
using Backend.Repository.UserRepository;
using Backend.Services.PersonalAccountService;
using Backend.Services.TransectionService;
using Backend.Services.UserService;
using FIN.Service.EmailServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<StockVaultContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["AppSettings:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["AppSettings:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["AppSettings:Token"])),
            ValidateIssuerSigningKey = true
        };
    });

// Registering dependency injection services
builder.Services.AddScoped<IUserService,  UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<IPersonalAccountService, PersonalAccountService>();
builder.Services.AddScoped<IPersonalAccountRepository, PersonalAccountRepository>();
builder.Services.AddScoped<IAccountRepositoryLocks, AccountLocksRepository>();

builder.Services.AddScoped<ITransectionRepository, TransectionRepository>();
builder.Services.AddScoped<ITransectionService, TransectionService>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
