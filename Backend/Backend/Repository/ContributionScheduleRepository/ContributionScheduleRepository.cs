using Backend.Dtos.ContributionScheduleDtos;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.ContributionScheduleRepository
{
    public class ContributionScheduleRepository(StockVaultContext context) : IContributionScheduleRepository
    {
        public async Task AddScheduleAsync(ContributionSchedule schedule)
        {
            await context.ContributionSchedules.AddAsync(schedule);
        }

        public async Task ActivateScheduleAsync(int scheduleId)
        {
            await context.ContributionSchedules
                .Where(s => s.Id == scheduleId)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.IsActive, true));
        }

        public async Task DeactivateAllSchedulesAsync(int jointAccountId)
        {
            await context.ContributionSchedules
                .Where(s => s.JointAccountId == jointAccountId && s.IsActive)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.IsActive, false));
        }

        public async Task DeactivateScheduleAsync(int scheduleId)
        {
            await context.ContributionSchedules
                .Where(s => s.Id == scheduleId)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.IsActive, false));
        }

        public async Task<ScheduleDto?> GetActiveScheduleAsync(int jointAccountId)
        {
            return await context.ContributionSchedules
                .Where(s => s.JointAccountId == jointAccountId && s.IsActive)
                .Select(s => new ScheduleDto
                {
                    Id = s.Id,
                    AmountCents = s.AmountCents,
                    Frequency = s.Frequency,
                    StartDate = s.StartDate,
                    IsActive = s.IsActive
                })
                .FirstOrDefaultAsync();
        }

        public async Task<ContributionSchedule?> GetScheduleByIdAsync(int scheduleId)
        {
            return await context.ContributionSchedules
                .FirstOrDefaultAsync(s => s.Id == scheduleId);
        }

        public async Task<bool> HasActiveScheduleAsync(int jointAccountId)
        {
            return await context.ContributionSchedules
                .AnyAsync(s => s.JointAccountId == jointAccountId && s.IsActive);
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task UpdateFrequencyAsync(int scheduleId, string frequency)
        {
            await context.ContributionSchedules
                .Where(s => s.Id == scheduleId)
                .ExecuteUpdateAsync(s => s.SetProperty(p => p.Frequency, frequency));
        }
    }
}