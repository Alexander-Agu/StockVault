namespace Backend.Dtos.JointAccountMembersDtos
{
    public class AddMemberDto
    {
        public string email { get; set; } = string.Empty;
        public string Role { get; set; } = "MEMBER";
    }

    public class ChangeRoleDto
    {
        public string Role { get; set; } = string.Empty;
    }

    public class MemberDto
    {
        public int UserId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public DateTime JoinedAt { get; set; }
    }
}