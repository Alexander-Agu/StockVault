using Backend.Dtos.ContributionScheduleDtos;
using Backend.Dtos.ResponseDto;

namespace Backend.Services.ContributionScheduleService
{
    public interface IContributionScheduleService
    {
        Task<ApiResponse<ScheduleDto>> CreateScheduleAsync(int userId, int jointAccountId, CreateScheduleDto createSchedule);
        Task<ApiResponse<string>> ActivateScheduleAsync(int userId, int scheduleId);
        Task<ApiResponse<string>> DeactivateScheduleAsync(int userId, int scheduleId);
        Task<ApiResponse<string>> UpdateFrequencyAsync(int userId, int scheduleId, UpdateFrequencyDto updateFrequency);
        Task<ApiResponse<ScheduleDto>> GetActiveScheduleAsync(int userId, int jointAccountId);
    }
}