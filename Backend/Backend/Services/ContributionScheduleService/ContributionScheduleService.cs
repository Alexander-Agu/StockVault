using Backend.Dtos.ContributionScheduleDtos;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Repository.ContributionScheduleRepository;
using Backend.Repository.JointAccountMembersRepository;

namespace Backend.Services.ContributionScheduleService
{
    public class ContributionScheduleService(
        IContributionScheduleRepository scheduleRepo,
        IJointAccountMembersRepository membersRepo) : IContributionScheduleService
    {
        public async Task<ApiResponse<ScheduleDto>> CreateScheduleAsync(int userId, int jointAccountId, CreateScheduleDto createSchedule)
        {
            var response = new ApiResponse<ScheduleDto>
            {
                ResponseCode = ResponseCode.Created,
                Message = "Contribution schedule created successfully",
                Data = null
            };

            bool isAdmin = await membersRepo.IsUserAdminAsync(jointAccountId, userId);

            //Check if user is admin
            if (!isAdmin)
                {
                    response.ResponseCode = ResponseCode.Forbidden;
                    response.Message = "Only admins can create schedules";
                    return response;
                }

            // Check if active schedule exists
            if (await scheduleRepo.HasActiveScheduleAsync(jointAccountId))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "An active schedule already exists";
                return response;
            }

            var schedule = new ContributionSchedule
            {
                JointAccountId = jointAccountId,
                AmountCents = createSchedule.AmountCents,
                Frequency = createSchedule.Frequency,
                StartDate = createSchedule.StartDate,
                IsActive = true,
                CreatedAt = DateTime.UtcNow
            };

            await scheduleRepo.AddScheduleAsync(schedule);
            await scheduleRepo.SaveChangesAsync();

            response.Data = new ScheduleDto
            {
                Id = schedule.Id,
                AmountCents = schedule.AmountCents,
                Frequency = schedule.Frequency,
                StartDate = schedule.StartDate,
                IsActive = schedule.IsActive
            };

            return response;
        }

        public async Task<ApiResponse<string>> ActivateScheduleAsync(int userId, int scheduleId)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Contribution schedule activated",
                Data = null
            };

            var schedule = await scheduleRepo.GetScheduleByIdAsync(scheduleId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Schedule not found";
                return response;
            }

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(schedule.JointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can activate schedules";
                return response;
            }

            // Deactivate all other schedules for this joint account
            await scheduleRepo.DeactivateAllSchedulesAsync(schedule.JointAccountId);
            
            // Activate this schedule
            await scheduleRepo.ActivateScheduleAsync(scheduleId);
            await scheduleRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<string>> DeactivateScheduleAsync(int userId, int scheduleId)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Contribution schedule deactivated",
                Data = null
            };

            var schedule = await scheduleRepo.GetScheduleByIdAsync(scheduleId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Schedule not found";
                return response;
            }

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(schedule.JointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can deactivate schedules";
                return response;
            }

            await scheduleRepo.DeactivateScheduleAsync(scheduleId);
            await scheduleRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<string>> UpdateFrequencyAsync(int userId, int scheduleId, UpdateFrequencyDto updateFrequency)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Frequency updated successfully",
                Data = null
            };

            var schedule = await scheduleRepo.GetScheduleByIdAsync(scheduleId);
            if (schedule == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "Schedule not found";
                return response;
            }

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(schedule.JointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can update schedules";
                return response;
            }

            // Cannot modify active schedule
            if (schedule.IsActive)
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "Cannot modify an active schedule";
                return response;
            }

            await scheduleRepo.UpdateFrequencyAsync(scheduleId, updateFrequency.Frequency);
            await scheduleRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<ScheduleDto>> GetActiveScheduleAsync(int userId, int jointAccountId)
        {
            var response = new ApiResponse<ScheduleDto>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Active schedule retrieved successfully",
                Data = null
            };

            // Check if user is a member
            if (!await membersRepo.IsUserMemberAsync(jointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "You are not a member of this account";
                return response;
            }

            response.Data = await scheduleRepo.GetActiveScheduleAsync(jointAccountId);
            
            if (response.Data == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "No active schedule found";
            }

            return response;
        }
    }
}