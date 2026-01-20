using Backend.Dtos.TransectionDto;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class TransectionMapping
    {
        public static Transection ToEntity(this CreateTransectionDto transection)
        {
            return new() {
                AccountId = transection.AccountId,
                AccountType = transection.AccountType,
                AmountCents = transection.AmountCents,
                TransectionType = transection.TransectionType,
                CreatedAt = transection.CreatedAt,
            };
        }

        public static TransectionDto  ToDto(this Transection transection)
        {
            return new() { 
                transectionId = transection.Id,
                AccountId = transection.AccountId,
                AccountType = transection.AccountType,
                AmountCents = transection.AmountCents,
                TransectionType = transection.TransectionType,
                UserName = transection.User != null ? transection.User.FirstName : "",
                CreatedAt = transection.CreatedAt,
            };
        }
        public static AccountBalanceDto ToBalance(this Transection transection)
        {
            return new()
            {
              AccountId = transection.AccountId,
            };
        }
    }
}
