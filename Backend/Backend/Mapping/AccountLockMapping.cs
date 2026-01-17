using Backend.Dtos.AccountLockDtos;
using Backend.Entities;

namespace Backend.Mapping
{
    public static class AccountLockMapping
    {
        public static AccountLocks ToEntity(this LockAccountDto accountLock)
        {
            return new AccountLocks()
            {
                LockedUntil = accountLock.LockDate,
                Active = true
            };
        }
    }
}
