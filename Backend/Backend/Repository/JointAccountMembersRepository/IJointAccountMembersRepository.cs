using Backend.Dtos.JointAccountMembersDtos;
using Backend.Entities;

namespace Backend.Repository.JointAccountMembersRepository
{
    public interface IJointAccountMembersRepository
    {
        Task SaveChangesAsync();
        Task AddMemberAsync(JointAccountMembers member);
        Task<JointAccountMembers?> GetMemberAsync(int jointAccountId, int userId);
        Task<List<MemberDto>> GetAllMembersAsync(int jointAccountId);
        Task<bool> IsUserMemberAsync(int jointAccountId, int userId);
        Task<bool> IsUserAdminAsync(int jointAccountId, int userId);
        Task<int> GetAdminCountAsync(int jointAccountId);
        Task RemoveMemberAsync(int jointAccountId, int userId);
        Task UpdateMemberRoleAsync(int jointAccountId, int userId, string role);
    }
}