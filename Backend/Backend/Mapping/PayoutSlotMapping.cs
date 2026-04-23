using Backend.Dtos.PayoutSlotDto;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class PayoutSlotMapping
    {
        public static PayoutSlotDto ToDto(this PayoutSlot slot)
        {
            return new PayoutSlotDto {
                Id = slot.Id,
                PayoutDate = slot.PayoutDate,
                IsPaidOut = slot.IsPaidOut,
                Position = slot.Position,
                CycleId = slot.CycleId,
                UserId = slot.UserId,
            };
        }
    }
}
