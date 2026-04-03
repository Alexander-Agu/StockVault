using Backend.Dtos.ContributionScheduleDtos;
using Backend.Entities;

namespace Backend.Repository.ContributionScheduleRepository
{
    public interface IContributionScheduleRepository
    {
        Task SaveChangesAsync();
        Task AddScheduleAsync(ContributionSchedule schedule);
        Task<ContributionSchedule?> GetScheduleByIdAsync(int scheduleId);
        Task<ScheduleDto?> GetActiveScheduleAsync(int jointAccountId);
        Task<bool> HasActiveScheduleAsync(int jointAccountId);
        Task DeactivateAllSchedulesAsync(int jointAccountId);
        Task ActivateScheduleAsync(int scheduleId);
        Task DeactivateScheduleAsync(int scheduleId);
        Task UpdateFrequencyAsync(int scheduleId, string frequency);
    }
}