using System.ComponentModel.DataAnnotations;

namespace Backend.Dtos.UserDtos
{
    public class ProfileDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;
    }
}
