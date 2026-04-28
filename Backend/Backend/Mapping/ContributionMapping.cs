using Backend.Dtos.Contributions;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class ContributionMapping
    {
        public static ContributionDtos ToDto(this Contribution contribution)
        {
            return new ContributionDtos
            {
                Id = contribution.Id,
                SlotId = contribution.SlotId,
                UserId = contribution.UserId,
                Status = contribution.Status,
                CreatedAt = contribution.CreatedAt,
                PaidAt = contribution.PaidAt,
                AmountCents = contribution.AmountCents,
            };
        }
    }
}
