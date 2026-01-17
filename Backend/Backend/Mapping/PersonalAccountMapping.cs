using Backend.Dtos.AccountDtos;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class PersonalAccountMapping
    {    
        public static PersonalAccount ToEntity(this CreateAccountDto newAccount)
        {
            return new PersonalAccount()
            {
                Title = newAccount.Title,
                CreatedAt = DateTime.Now,
                Balance = 0
            };
        }


        public static PersonalAccount ToDto(this PersonalAccount account)
        {
            return account;
        }
    }
}
