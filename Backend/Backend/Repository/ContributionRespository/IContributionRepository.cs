using Backend.Dtos.Contributions;
using Backend.Entities;

namespace Backend.Repository.ContributionRespository
{
    public interface IContributionRepository
    {
        public Task AddContributionAsync(Contribution contribution);
        public Task AddBatchContributionAsync(List<Contribution> contributions);
        public Task<Contribution> GetContributionById(int id);
        public Task<ContributionDtos> GetContributionBySlotIdAndId(int slotId, int id);
        public Task<List<ContributionDtos>> GetAllContributionBySlotId(int slotId);
        public Task SaveChangesAsync();
    }
}
