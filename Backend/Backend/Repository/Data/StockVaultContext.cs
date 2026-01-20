using Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.Data
{
    public class StockVaultContext : DbContext
    {
        public StockVaultContext(DbContextOptions<StockVaultContext> options)
            : base(options)
        {
        }

        // Database tables
        public DbSet<User> Users => Set<User>();
        public DbSet<PersonalAccount> PersonalAccounts => Set<PersonalAccount>();
        public DbSet<AccountLocks> AccountLocks => Set<AccountLocks>();
        public DbSet<Transection> Transections => Set<Transection>();


        // Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // PersonalAccount one-to-one AccountLocks Relationships
            modelBuilder.Entity<PersonalAccount>()
                .HasOne(a => a.AccountLock)         // A Lock can have only belong to one personal account
                .WithOne(p => p.PersonalAccount)    // One personal account has one lock
                .HasForeignKey<AccountLocks>(p => p.PersonalAccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PersonalAccount>()
                .HasOne(p => p.User)
                .WithMany(u => u.PersonalAccounts)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Transection>()
                .HasOne(u => u.User)
                .WithMany(t => t.Transections)
                .HasForeignKey(t => t.userId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
