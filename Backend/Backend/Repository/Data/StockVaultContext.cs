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
    }
}
