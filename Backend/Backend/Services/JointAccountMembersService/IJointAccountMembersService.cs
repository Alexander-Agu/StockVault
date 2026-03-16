using Backend.Dtos.JointAccountMembersDtos;
using Backend.Dtos.ResponseDto;

namespace Backend.Services.JointAccountMembersService
{
    public interface IJointAccountMembersService
    {
        Task<ApiResponse<string>> AddMemberAsync(int userId, int jointAccountId, AddMemberDto addMember);
        Task<ApiResponse<string>> RemoveMemberAsync(int userId, int jointAccountId, int targetUserId);
        Task<ApiResponse<string>> ChangeRoleAsync(int userId, int jointAccountId, int targetUserId, ChangeRoleDto changeRole);
        Task<ApiResponse<List<MemberDto>>> GetMembersAsync(int userId, int jointAccountId);
    }
}