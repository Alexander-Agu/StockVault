using Backend.Dtos.JointAccountMembersDtos;
using Backend.Dtos.ResponseDto;
using Backend.Entities;
using Backend.Repository.JointAccountMembersRepository;
using Backend.Repository.UserRepository;

namespace Backend.Services.JointAccountMembersService
{
    public class JointAccountMembersService(
        IJointAccountMembersRepository membersRepo,
        IUserRepository userRepo) : IJointAccountMembersService
    {
        public async Task<ApiResponse<string>> AddMemberAsync(int userId, int jointAccountId, AddMemberDto addMember)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Created,
                Message = "Member added successfully",
                Data = null
            };

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(jointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can add members";
                return response;
            }

            // Check if target user exists
            var targetUser = await userRepo.GetUserByEmailAsync(addMember.email);
            if (targetUser == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User not found";
                return response;
            }

            // Check if user is already a member
            if (await membersRepo.IsUserMemberAsync(jointAccountId, targetUser.Id))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "User is already a member";
                return response;
            }

            // Add member
            var member = new JointAccountMembers
            {
                JointAccountId = jointAccountId,
                UserId = targetUser.Id,
                Role = addMember.Role,
                JoinedAt = DateTime.UtcNow
            };

            await membersRepo.AddMemberAsync(member);
            await membersRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<string>> CreateAdminAsync(int userId, int jointAccountId, AddMemberDto addMember)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Created,
                Message = "Member added successfully",
                Data = null
            };

            // Check if target user exists
            var targetUser = await userRepo.GetUserByEmailAsync(addMember.email);
            if (targetUser == null)
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User not found";
                return response;
            }

            // Check if user is already a member
            if (await membersRepo.IsUserMemberAsync(jointAccountId, targetUser.Id))
            {
                response.ResponseCode = ResponseCode.BadRequest;
                response.Message = "User is already a member";
                return response;
            }

            // Add member
            var member = new JointAccountMembers
            {
                JointAccountId = jointAccountId,
                UserId = targetUser.Id,
                Role = addMember.Role,
                JoinedAt = DateTime.UtcNow
            };

            await membersRepo.AddMemberAsync(member);
            await membersRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<string>> RemoveMemberAsync(int userId, int jointAccountId, int targetUserId)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Member removed successfully",
                Data = null
            };

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(jointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can remove members";
                return response;
            }

            // Check if target user is a member
            if (!await membersRepo.IsUserMemberAsync(jointAccountId, targetUserId))
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User is not a member";
                return response;
            }

            // Check if removing last admin
            if (await membersRepo.IsUserAdminAsync(jointAccountId, targetUserId))
            {
                var adminCount = await membersRepo.GetAdminCountAsync(jointAccountId);
                if (adminCount <= 1)
                {
                    response.ResponseCode = ResponseCode.BadRequest;
                    response.Message = "Cannot remove the last admin";
                    return response;
                }
            }

            await membersRepo.RemoveMemberAsync(jointAccountId, targetUserId);
            await membersRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<string>> ChangeRoleAsync(int userId, int jointAccountId, int targetUserId, ChangeRoleDto changeRole)
        {
            var response = new ApiResponse<string>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Member role updated successfully",
                Data = null
            };

            // Check if user is admin
            if (!await membersRepo.IsUserAdminAsync(jointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "Only admins can change roles";
                return response;
            }

            // Check if target user is a member
            if (!await membersRepo.IsUserMemberAsync(jointAccountId, targetUserId))
            {
                response.ResponseCode = ResponseCode.NotFound;
                response.Message = "User is not a member";
                return response;
            }

            // Check if demoting last admin
            if (changeRole.Role == "MEMBER" && await membersRepo.IsUserAdminAsync(jointAccountId, targetUserId))
            {
                var adminCount = await membersRepo.GetAdminCountAsync(jointAccountId);
                if (adminCount <= 1)
                {
                    response.ResponseCode = ResponseCode.BadRequest;
                    response.Message = "Cannot demote the last admin";
                    return response;
                }
            }

            await membersRepo.UpdateMemberRoleAsync(jointAccountId, targetUserId, changeRole.Role);
            await membersRepo.SaveChangesAsync();

            return response;
        }

        public async Task<ApiResponse<List<MemberDto>>> GetMembersAsync(int userId, int jointAccountId)
        {
            var response = new ApiResponse<List<MemberDto>>
            {
                ResponseCode = ResponseCode.Ok,
                Message = "Members retrieved successfully",
                Data = null
            };

            // Check if user is a member
            if (!await membersRepo.IsUserMemberAsync(jointAccountId, userId))
            {
                response.ResponseCode = ResponseCode.Forbidden;
                response.Message = "You are not a member of this account";
                return response;
            }

            response.Data = await membersRepo.GetAllMembersAsync(jointAccountId);
            return response;
        }
    }
}