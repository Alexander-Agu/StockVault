using Backend.Entities;

namespace Backend.Repository.UserRepository
{
    public interface IUserRepository
    {
        /*
         * TODO: Uses the user entity to add new user to the Database
        */
        public void AddUserAsync(User user);


        /*
         * TODO: Checks if email exists
         */
        public Task<bool> EmailExistsAsync(string email);
    }
}
