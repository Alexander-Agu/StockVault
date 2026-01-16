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

        // Add your DbSets here
        // public DbSet<JointAccount> JointAccounts { get; set; }
        // public DbSet<Payment> Payments { get; set; }
        public DbSet<User> Users => Set<User>();


        // Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // User one-to-many PersonalAccount relationship
            modelBuilder.Entity<User>()
                .HasMany(p => p.PersonalAccounts)   // One User has many personal account
                .WithOne(u => u.User)               // One post has one user
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // PersonalAccount one-to-one AccountLocks Relationships
            modelBuilder.Entity<PersonalAccount>()
                .HasOne(a => a.AccountLock)         // A Lock can have only belong to one personal account
                .WithOne(p => p.PersonalAccount)    // One personal account has one lock
                .HasForeignKey<PersonalAccount>(p => p.Id)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
