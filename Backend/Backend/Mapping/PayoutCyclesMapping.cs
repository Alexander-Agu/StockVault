using Backend.Dtos.PayoutCycles;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class PayoutCyclesMapping
    {
        public static PayoutCycleDto ToDto(this PayoutCycles cycle)
        {
            return new PayoutCycleDto
            {
                Id = cycle.Id,
                CycleNumber = cycle.CycleNumber,
                EndDate = cycle.EndDate,
                EstimatedTotalAmount = cycle.EstimatedTotalAmount / 100,
                StartDate = cycle.StartDate,
                TotalMembersAtStart = cycle.TotalMembersAtStart,
                IsActive = cycle.IsActive,
                JointAccountId = cycle.JointAccountId,
                ScheduleId = cycle.ScheduleId,
            };
        }
    }
}
