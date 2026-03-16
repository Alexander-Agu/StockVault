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
        public DbSet<JointAccount> JointAccounts => Set<JointAccount>();
        public DbSet<JointAccountMembers> JointAccountMembers => Set<JointAccountMembers>();
        public DbSet<ContributionSchedule> ContributionSchedules => Set<ContributionSchedule>();
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

            // JointAccountMembers relationships
            modelBuilder.Entity<JointAccountMembers>()
                .HasOne(m => m.JointAccount)
                .WithMany()
                .HasForeignKey(m => m.JointAccountId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<JointAccountMembers>()
                .HasOne(m => m.User)
                .WithMany()
                .HasForeignKey(m => m.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Unique constraint: one user per joint account
            modelBuilder.Entity<JointAccountMembers>()
                .HasIndex(m => new { m.JointAccountId, m.UserId })
                .IsUnique();

            // ContributionSchedule relationships
            modelBuilder.Entity<ContributionSchedule>()
                .HasOne(c => c.JointAccount)
                .WithMany()
                .HasForeignKey(c => c.JointAccountId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
