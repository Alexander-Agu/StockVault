using Backend.Dtos.Contributions;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.ContributionRespository
{
    public class ContributionRepository(StockVaultContext context) : IContributionRepository
    {
        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();                        
        }
        public async Task AddBatchContributionAsync(List<Contribution> contributions)
        {
            await context.Contributions.AddRangeAsync(contributions);
        }

        public async Task AddContributionAsync(Contribution contribution)
        {
            await context.Contributions.AddAsync(contribution);
        }

        public async Task<List<ContributionDtos>> GetAllContributionBySlotId(int slotId)
        {
            return await context.Contributions.Where(s => s.SlotId == slotId)
                .Select(s => new ContributionDtos
                {
                    SlotId = slotId,
                    UserId = s.UserId,
                    Id = s.Id,
                    CreatedAt = s.CreatedAt,
                    PaidAt = s.PaidAt,
                    AmountCents = s.AmountCents,
                    Status = s.Status
                }).ToListAsync();
        }

        public async Task<Contribution> GetContributionById(int id)
        {
            return await context.Contributions.FindAsync(id);
        }

        public async Task<ContributionDtos> GetContributionBySlotIdAndId(int slotId, int id)
        {
            return await context.Contributions.Where(s => s.Id == id && s.SlotId == slotId)
                .Select(s => new ContributionDtos
                {
                    SlotId = s.SlotId,
                    UserId = s.UserId,
                    Id = s.Id,
                    CreatedAt = s.CreatedAt,
                    PaidAt = s.PaidAt,
                    AmountCents = s.AmountCents,
                    Status = s.Status
                }).FirstOrDefaultAsync();
        }
    }
}
