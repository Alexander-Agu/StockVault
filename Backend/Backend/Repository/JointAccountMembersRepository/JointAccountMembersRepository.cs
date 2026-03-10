using Backend.Dtos.JointAccountMembersDtos;
using Backend.Entities;
using Backend.Repository.Data;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repository.JointAccountMembersRepository
{
    public class JointAccountMembersRepository(StockVaultContext context) : IJointAccountMembersRepository
    {
        public async Task AddMemberAsync(JointAccountMembers member)
        {
            await context.JointAccountMembers.AddAsync(member);
        }

        public async Task<List<MemberDto>> GetAllMembersAsync(int jointAccountId)
        {
            return await context.JointAccountMembers
                .Where(m => m.JointAccountId == jointAccountId)
                .Select(m => new MemberDto
                {
                    UserId = m.UserId,
                    Role = m.Role,
                    JoinedAt = m.JoinedAt
                })
                .ToListAsync();
        }

        public async Task<int> GetAdminCountAsync(int jointAccountId)
        {
            return await context.JointAccountMembers
                .Where(m => m.JointAccountId == jointAccountId && m.Role == "ADMIN")
                .CountAsync();
        }

        public async Task<JointAccountMembers?> GetMemberAsync(int jointAccountId, int userId)
        {
            return await context.JointAccountMembers
                .FirstOrDefaultAsync(m => m.JointAccountId == jointAccountId && m.UserId == userId);
        }

        public async Task<bool> IsUserAdminAsync(int jointAccountId, int userId)
        {
            return await context.JointAccountMembers
                .AnyAsync(m => m.JointAccountId == jointAccountId && m.UserId == userId && m.Role == "ADMIN");
        }

        public async Task<bool> IsUserMemberAsync(int jointAccountId, int userId)
        {
            return await context.JointAccountMembers
                .AnyAsync(m => m.JointAccountId == jointAccountId && m.UserId == userId);
        }

        public async Task RemoveMemberAsync(int jointAccountId, int userId)
        {
            await context.JointAccountMembers
                .Where(m => m.JointAccountId == jointAccountId && m.UserId == userId)
                .ExecuteDeleteAsync();
        }

        public async Task SaveChangesAsync()
        {
            await context.SaveChangesAsync();
        }

        public async Task UpdateMemberRoleAsync(int jointAccountId, int userId, string role)
        {
            await context.JointAccountMembers
                .Where(m => m.JointAccountId == jointAccountId && m.UserId == userId)
                .ExecuteUpdateAsync(m => m.SetProperty(p => p.Role, role));
        }
    }
}